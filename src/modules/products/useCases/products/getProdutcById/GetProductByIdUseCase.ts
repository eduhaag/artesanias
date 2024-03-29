import { injectable, inject } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

@injectable()
class GetProductByIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    return product;
  }
}

export { GetProductByIdUseCase };
