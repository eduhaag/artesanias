import { inject, injectable } from 'tsyringe';

import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteProductCategoryUseCase {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const category = await this.productCategoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Product category not found.', 404);
    }

    if (category.products.length > 0) {
      throw new AppError(
        'There are products linked to this category, remove them first.',
        400,
      );
    }

    await this.productCategoriesRepository.delete(id);
  }
}

export { DeleteProductCategoryUseCase };
