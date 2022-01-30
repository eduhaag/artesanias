import { ProductCategoriesRepositoryInMemory } from '@modules/products/repositories/in-memory/ProductCategoriesRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateProductCategoryUseCase } from './CreateProductCategoryUseCase';

let createProductCategory: CreateProductCategoryUseCase;
let productCategoriesRepositoryInMemory: ProductCategoriesRepositoryInMemory;

describe('Create product category', () => {
  beforeEach(() => {
    productCategoriesRepositoryInMemory =
      new ProductCategoriesRepositoryInMemory();

    createProductCategory = new CreateProductCategoryUseCase(
      productCategoriesRepositoryInMemory,
    );
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category test',
      description: 'Category description test',
    };

    await createProductCategory.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated =
      await productCategoriesRepositoryInMemory.findByName(category.name);

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category test',
        description: 'Category description test',
      };

      await createProductCategory.execute({
        name: category.name,
        description: category.description,
      });

      await createProductCategory.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
