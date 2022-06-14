import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IPurchaseProductDTO } from '@modules/purchases/dtos/IPurchaseProductDTO';
import { PurchaseProduct } from '@modules/purchases/infra/typeorm/entities/PurchaseProduct';
import { IPurchaseProductsRepository } from '@modules/purchases/repositories/IPurchaseProductsRepository';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreatePurchaseProductUseCase {
  constructor(
    @inject('PurchaseProductsRepository')
    private PurchaseProductsRepository: IPurchaseProductsRepository,

    @inject('ProductsRepository')
    private ProductsRepository: IProductsRepository,

    @inject('PurchasesRepository')
    private PurchasesRepository: IPurchasesRepository,
  ) {}

  async execute({
    price,
    quantity,
    productId,
    purchaseId,
    reference,
  }: IPurchaseProductDTO): Promise<PurchaseProduct> {
    const checkPurchaseExists = await this.PurchasesRepository.getById(
      purchaseId,
    );

    if (!checkPurchaseExists) {
      throw new AppError('Purchase does not found.', 404);
    }

    if (
      checkPurchaseExists.status === 'Finalizado' ||
      checkPurchaseExists.status === 'Cancelado'
    ) {
      throw new AppError('Is not possible modify this purchase.');
    }

    const checkProductExists = await this.ProductsRepository.findById(
      productId,
    );

    if (!checkProductExists) {
      throw new AppError('Product does not found', 404);
    }

    const purchaseProduct =
      await this.PurchaseProductsRepository.createPurchaseProduct({
        price,
        quantity,
        productId,
        purchaseId,
        reference,
      });

    return purchaseProduct;
  }
}

export { CreatePurchaseProductUseCase };
