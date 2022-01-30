import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

@injectable()
class ListAllProductsToSaleUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(categoryId: string): Promise<Product[]> {
    const products = await this.productsRepository.getAllProductsToSale(
      categoryId,
    );

    return products;
  }
}

export { ListAllProductsToSaleUseCase };
