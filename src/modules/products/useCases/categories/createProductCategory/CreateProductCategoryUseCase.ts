import { inject, injectable } from 'tsyringe';

import { ICreateProductCategoryDTO } from '@modules/products/dtos/ICreateProductCategoryDTO';
import { ProductCategory } from '@modules/products/infra/typeorm/entities/ProductCategory';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateProductCategoryUseCase {
  constructor(
    @inject('ProductCategoriesRepository')
    private categoriesRepository: IProductCategoriesRepository,
  ) {}

  async execute({
    name,
    description,
  }: ICreateProductCategoryDTO): Promise<ProductCategory> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists.');
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateProductCategoryUseCase };
