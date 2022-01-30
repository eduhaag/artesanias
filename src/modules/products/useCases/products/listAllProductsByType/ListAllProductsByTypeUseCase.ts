import { injectable, inject } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

@injectable()
class ListAllProductsByTypeUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(types: string[]): Promise<Product[]> {
    console.log(types);
    const products = await this.productsRepository.listAllByTypes(types);

    return products;
  }
}

export { ListAllProductsByTypeUseCase };
