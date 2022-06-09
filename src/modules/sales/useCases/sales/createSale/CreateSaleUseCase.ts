/* eslint-disable no-cond-assign */
/* eslint-disable no-constant-condition */
/* eslint-disable no-param-reassign */
import dayjs from 'dayjs';
import { container, inject, injectable } from 'tsyringe';

import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IPaymentMethodsDTO } from '@modules/sales/dtos/IPaymentMethodsDTO';
import { ISaleDTO } from '@modules/sales/dtos/ISaleDTO';
import { ISaleProductDTO } from '@modules/sales/dtos/ISaleProductDTO';
import { Sale } from '@modules/sales/infra/typeorm/entities/Sale';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';
import { AppError } from '@shared/errors/AppError';
import { MovesStock } from '@utils/movesStock';

import config from '../../../../../../config.json';

interface IFinancialGeneration {
  paymentMethod: IPaymentMethodsDTO;
  saledProducts: ISaleProductDTO[];
  discount: number;
  shippingCoast: number;
  addition: number;
}

function financialEntriesGeneration({
  paymentMethod,
  saledProducts,
  discount,
  shippingCoast,
  addition,
}: IFinancialGeneration): Statement[] {
  const dateToFulfilled = dayjs().add(paymentMethod.creditTime, 'd').toDate();
  const { destinationAccount } = paymentMethod;

  const productsValue = saledProducts.reduce((acc, saleProduct) => {
    const { price, quantity, discount = 0 } = saleProduct;
    return acc + (price - discount) * quantity;
  }, 0);

  const totalValue = productsValue + addition - discount;
  const fixedRate =
    totalValue && shippingCoast
      ? paymentMethod.fixRate / 2
      : paymentMethod.fixRate;

  const entries: Statement[] = [];

  // cria o recebimento da venda de produtos
  if (totalValue && totalValue > 0) {
    entries.push({
      toFulfilled: dateToFulfilled,
      bankAccountId: destinationAccount,
      ledgerId: config.fixed_ledges.salesReceipt,
      value: totalValue,
      description: 'Recebimento: Venda',
    });

    const saleTax =
      parseFloat(
        (totalValue * paymentMethod.variableRate + fixedRate).toFixed(2),
      ) * -1;

    if (saleTax > 0) {
      entries.push({
        toFulfilled: dateToFulfilled,
        bankAccountId: destinationAccount,
        ledgerId: config.fixed_ledges.saleTax,
        value: saleTax,
        description: 'Taxa: Venda',
      });
    }
  }

  // cria o recebimento do frete
  if (shippingCoast && shippingCoast > 0) {
    entries.push({
      toFulfilled: dateToFulfilled,
      bankAccountId: destinationAccount,
      ledgerId: config.fixed_ledges.shippingReceipt,
      value: shippingCoast,
      description: 'Recebimento: Frete',
    });

    const shippingTax =
      parseFloat(
        (shippingCoast * paymentMethod.variableRate + fixedRate).toFixed(2),
      ) * -1;

    if (shippingTax > 0) {
      entries.push({
        toFulfilled: dateToFulfilled,
        bankAccountId: destinationAccount,
        ledgerId: config.fixed_ledges.shippingTax,
        value: shippingTax,
        description: 'Taxa: Frete',
      });
    }
  }

  return entries;
}

@injectable()
class CreateSaleUseCase {
  constructor(
    @inject('SalesRepository')
    private SalesRepository: ISalesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('SaleChannelsRepository')
    private SaleChannelsRepository: ISaleChannelsRepository,

    @inject('PaymentMethodsRepository')
    private PaymentMethodsRepository: IPaymentMethodsRepository,

    @inject('ShippingMethodsRepository')
    private ShippingMethodsRepository: IShippingMethodsRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    channelId,
    paymentMethodId,
    shippingForecast,
    shippingId,
    addition,
    city,
    client,
    complement,
    discount,
    district,
    number,
    observation,
    reference,
    shippingCoast,
    state,
    street,
    zipCode,
    products,
  }: ISaleDTO): Promise<Sale> {
    // faz verificações ref client
    if (client.id) {
      const clientExists = await this.clientsRepository.getClientById(
        client.id,
      );
      if (!clientExists) {
        throw new AppError('Client does not found', 404);
      }

      // eslint-disable-next-line no-param-reassign
      client = clientExists;
    } else if (client.taxCode) {
      const checkIfClientTaxCodeExists =
        await this.clientsRepository.getClientByTaxCode(client.taxCode);

      if (checkIfClientTaxCodeExists) {
        throw new AppError('Client tax code already exists.');
      }
    }

    // verifica se existe o canal de vendas
    const channelExists = await this.SaleChannelsRepository.findById(channelId);
    if (!channelExists) {
      throw new AppError('Sale channel does not found.', 404);
    }

    // verifica se existe o metodo de pagamento
    const paymentMethodExists =
      await this.PaymentMethodsRepository.findMethodByID(paymentMethodId);
    if (!paymentMethodExists) {
      throw new AppError('Payment method does not exists.', 404);
    }

    // Verifica se existe o metodo de envio
    const shippingMethodExists =
      await this.ShippingMethodsRepository.findShippingMethodByID(shippingId);
    if (!shippingMethodExists) {
      throw new AppError('Shipping method does not exists.', 404);
    }

    // Verifica se todos os produtos existem
    if (products.length === 0) {
      throw new AppError('A Sale needs products to be created.');
    }

    // eslint-disable-next-line no-restricted-syntax
    for await (const product of products) {
      const checkProductExist = await this.productsRepository.findById(
        product.productId,
      );

      if (!checkProductExist) {
        throw new AppError(
          `Product ID#${product.productId} does not found.`,
          404,
        );
      }
    }

    const financialEntries = financialEntriesGeneration({
      addition,
      discount,
      paymentMethod: paymentMethodExists,
      saledProducts: products,
      shippingCoast,
    });

    // cria o pedido
    const sale = await this.SalesRepository.createSale({
      client,
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
      addition,
      city,
      complement,
      discount,
      district,
      number,
      observation,
      reference,
      shippingCoast,
      state,
      street,
      zipCode,
      products,
      history: [
        {
          history: 'Pedido criado.',
        },
      ],
      statements: financialEntries,
    });

    const movesStock = container.resolve(MovesStock);

    await movesStock.addStockMovimentsBySale({
      saleId: sale.id,
      products: sale.products,
    });

    return sale;
  }
}

export { CreateSaleUseCase };
