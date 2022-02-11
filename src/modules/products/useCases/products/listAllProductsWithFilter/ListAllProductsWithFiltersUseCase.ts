import { injectable, inject } from 'tsyringe';

import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

interface IFilter {
  name?: string;
  categoryId?: number;
  toSale?: boolean;
  types?: any;
}

@injectable()
class ListAllProductsWithFiltersUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    name,
    categoryId,
    toSale,
    types,
  }: IFilter): Promise<Product[]> {
    const products = await this.productsRepository.listProductsByFilter({
      types,
      name,
      categoryId,
      toSale,
    });

    return products;
  }
}

export { ListAllProductsWithFiltersUseCase };
