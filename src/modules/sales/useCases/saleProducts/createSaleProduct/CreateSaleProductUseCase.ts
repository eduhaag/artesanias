import { container, inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { ISaleProductDTO } from '@modules/sales/dtos/ISaleProductDTO';
import { SaleProduct } from '@modules/sales/infra/typeorm/entities/SaleProduct';
import { ISaleProductsRepository } from '@modules/sales/repositories/ISaleProductsRepository';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { AppError } from '@shared/errors/AppError';
import { MovesStock } from '@utils/movesStock';

@injectable()
class CreateSaleProductUseCase {
  constructor(
    @inject('SaleProductsRepository')
    private SaleProductsRepository: ISaleProductsRepository,

    @inject('SalesRepository')
    private SalesRepository: ISalesRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    price,
    productId,
    quantity,
    saleId,
    discount,
    observations,
    theme,
  }: ISaleProductDTO): Promise<SaleProduct> {
    const checkSaleExists = await this.SalesRepository.getSaleById(saleId);
    if (!checkSaleExists) {
      throw new AppError('Sale does not found', 404);
    }

    const checkProductExists = await this.productsRepository.findById(
      productId,
    );
    if (!checkProductExists) {
      throw new AppError('Product does not found', 404);
    }

    const saleProduct = await this.SaleProductsRepository.createSaleProduct({
      price,
      productId,
      quantity,
      saleId,
      discount,
      observations,
      theme,
    });

    const movesStock = container.resolve(MovesStock);

    await movesStock.addStockMovimentsBySale({
      saleId,
      products: [saleProduct],
    });

    return saleProduct;
  }
}

export { CreateSaleProductUseCase };
