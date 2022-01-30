import { inject, injectable } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

@injectable()
class ListProductsByCategoryUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(categoryId: number): Promise<Product[]> {
    const products =
      this.productsRepository.listProductsByCategoryId(categoryId);

    return products;
  }
}

export { ListProductsByCategoryUseCase };
