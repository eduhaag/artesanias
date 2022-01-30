import { inject, injectable } from 'tsyringe';

import { ProductCategory } from '@modules/products/infra/typeorm/entities/ProductCategory';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';

@injectable()
class ListProductCategoriesUseCase {
  constructor(
    @inject('ProductCategoriesRepository')
    private categoriesRepository: IProductCategoriesRepository,
  ) {}

  async execute(): Promise<ProductCategory[]> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}

export { ListProductCategoriesUseCase };
