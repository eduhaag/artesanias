import { inject, injectable } from 'tsyringe';

import { IUpdateProductCategoryDTO } from '@modules/products/dtos/IUpdateProductCategoryDTO';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateProductCategoryUseCase {
  constructor(
    @inject('ProductCategoriesRepository')
    private productCategoriesRepository: IProductCategoriesRepository,
  ) {}

  async execute({
    id,
    description,
    name,
  }: IUpdateProductCategoryDTO): Promise<void> {
    const checkCategoryExists = await this.productCategoriesRepository.findById(
      id,
    );

    if (!checkCategoryExists) {
      throw new AppError('Product category not found.', 404);
    }

    const checkIfNameIsNew = await this.productCategoriesRepository.findByName(
      name,
    );

    if (checkIfNameIsNew) {
      throw new AppError('Product category name already exists.', 400);
    }

    await this.productCategoriesRepository.update({
      id,
      name,
      description,
    });
  }
}

export { UpdateProductCategoryUseCase };
