import dayjs from 'dayjs';
import { inject, injectable } from 'tsyringe';

import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IPurchaseDTO } from '@modules/purchases/dtos/IPurchaseDTO';
import { IPurchaseProductDTO } from '@modules/purchases/dtos/IPurchaseProductDTO';
import { Purchase } from '@modules/purchases/infra/typeorm/entities/Purchase';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProveider';
import { AppError } from '@shared/errors/AppError';

import config from '../../../../../../config.json';

interface IFinancialGeneration {
  installments: number;
  products: IPurchaseProductDTO[];
  addition: number;
  shippingCoast: number;
  discount: number;
  productsType: 'Material' | 'Package';
  paymentAccountId: number;
}

// cria os lançamentos financeiros
function financialEntriesGeneration({
  installments,
  products,
  addition,
  shippingCoast,
  discount,
  productsType,
  paymentAccountId,
}: IFinancialGeneration): Statement[] {
  const ledger =
    productsType === 'Material'
      ? config.fixed_ledges.materialLedger
      : config.fixed_ledges.packingLedger;

  const productsValue = products.reduce((acc, product) => {
    const { price, quantity } = product;

    return acc + price * quantity;
  }, 0);

  const totalValue = productsValue + addition + shippingCoast - discount;

  const entries: Statement[] = [];

  if (installments === 1) {
    entries.push({
      bankAccountId: paymentAccountId,
      ledgerId: ledger,
      value: totalValue * -1,
      toFulfilled: new Date(),
      description: 'Pagamento de compra',
    });
  } else {
    const installmentValue =
      parseFloat((totalValue / installments).toFixed(2)) * -1;
    let installmentDate = new Date();

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < installments; i++) {
      entries.push({
        bankAccountId: paymentAccountId,
        ledgerId: ledger,
        value: installmentValue,
        toFulfilled: installmentDate,
        description: `Pagamento de compra [${i + 1}/${installments}]`,
      });
      installmentDate = dayjs(installmentDate).add(1, 'M').toDate();
    }
  }

  return entries;
}

@injectable()
class CreatePurchaseUseCase {
  constructor(
    @inject('PurchasesRepository')
    private PurchasesRepository: IPurchasesRepository,

    @inject('SuppliersRepository')
    private SuppliersRepository: ISuppliersRepository,

    @inject('ProductsRepository')
    private ProductsRepository: IProductsRepository,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,

    @inject('DateProvider')
    private DateProvider: IDateProvider,
  ) {}

  async execute({
    supplier,
    invoice,
    observations,
    products,
    addition,
    discount,
    shippingCoast,
    installments,
    productsType,
    paymentAccountId,
  }: IPurchaseDTO): Promise<Purchase> {
    if (supplier.id) {
      const supplierExists = await this.SuppliersRepository.getSupplierById(
        supplier.id,
      );

      if (!supplierExists) {
        throw new AppError('Supplier does not found', 404);
      }

      // eslint-disable-next-line no-param-reassign
      supplier = supplierExists;
    } else if (supplier.taxCode) {
      const checkIfSupplierTaxCodeExists =
        await this.SuppliersRepository.getSupplierByTaxCode(supplier.taxCode);

      if (checkIfSupplierTaxCodeExists) {
        throw new AppError('Supplier tax code already exists.');
      }
    }

    // Verifica se produtos existem
    if (products.length === 0) {
      throw new AppError('A purchase needs products to be created.');
    }

    // eslint-disable-next-line no-restricted-syntax
    for await (const product of products) {
      const checkproductExist = await this.ProductsRepository.findById(
        product.productId,
      );

      if (!checkproductExist) {
        throw new AppError(
          `Product ID#${product.productId} does not found.`,
          404,
        );
      }
    }

    if (productsType !== 'Material' && productsType !== 'Package') {
      throw new AppError('ProductsType must to be Material or Package.');
    }

    const checkBankAccountExists =
      await this.bankAccountsRepository.getBankAccountById(paymentAccountId);
    if (!checkBankAccountExists) {
      throw new AppError('Bank Account does not found', 404);
    }

    const statements = financialEntriesGeneration({
      installments,
      addition,
      discount,
      paymentAccountId,
      products,
      productsType,
      shippingCoast,
    });

    // Cria a compra
    const purchase = await this.PurchasesRepository.createPurchase({
      supplier,
      invoice,
      installments,
      observations,
      discount,
      addition,
      products,
      shippingCoast,
      status: 'Em andamento',
      statements,
    });

    return purchase;
  }
}

export { CreatePurchaseUseCase };
