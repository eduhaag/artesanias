import { inject, injectable } from 'tsyringe';

import { IUpdateProductDTO } from '@modules/products/dtos/IUpdateProductDTO';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductCategoriesRepository')
    private categoriesRepository: IProductCategoriesRepository,
  ) {}

  async execute({
    id,
    name,
    categoryId,
    coast,
    description,
    observations,
    movesStock,
    price,
    toSale,
    type,
  }: IUpdateProductDTO): Promise<void> {
    const checkIfProductExists = await this.productsRepository.findById(id);

    if (!checkIfProductExists) {
      throw new AppError('Product does not found.', 404);
    }

    const checkProductCategoryExists = await this.categoriesRepository.findById(
      categoryId,
    );

    if (!checkProductCategoryExists) {
      throw new AppError('Category does found', 404);
    }

    if (name !== checkIfProductExists.name) {
      const checkProductAlreadyExists =
        await this.productsRepository.findByName(name);

      if (checkProductAlreadyExists) {
        throw new AppError('Product already exists');
      }
    }

    await this.productsRepository.updateProduct({
      id,
      name,
      categoryId,
      coast,
      description,
      observations,
      movesStock,
      price,
      toSale,
      type,
    });
  }
}

export { UpdateProductUseCase };
