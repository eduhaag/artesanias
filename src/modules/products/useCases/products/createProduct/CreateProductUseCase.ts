import { inject, injectable } from 'tsyringe';

import { ICreateProductDTO } from '@modules/products/dtos/ICreateProductDTO';
import { Product } from '@modules/products/infra/typeorm/entities/Product';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductCategoriesRepository')
    private categoriesRepository: IProductCategoriesRepository,
  ) {}

  async execute({
    name,
    categoryId,
    coast,
    description,
    observations,
    movesStock,
    price,
    toSale,
    type,
    composition,
  }: ICreateProductDTO): Promise<Product> {
    if (categoryId) {
      const checkProductCategoryExists =
        await this.categoriesRepository.findById(categoryId);

      if (!checkProductCategoryExists) {
        throw new AppError('This category does not exists.', 404);
      }
    }

    const checkProductAlreadyExists = await this.productsRepository.findByName(
      name,
    );

    if (checkProductAlreadyExists) {
      throw new AppError('Product already exists');
    }

    const product = await this.productsRepository.createProduct({
      name,
      type,
      toSale,
      price,
      movesStock,
      observations,
      description,
      coast,
      categoryId,
      composition,
    });

    return product;
  }
}

export { CreateProductUseCase };
