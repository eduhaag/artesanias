import { inject, injectable } from 'tsyringe';

import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const checkProductExists = await this.productsRepository.findById(id);

    if (!checkProductExists) {
      throw new AppError('Product not found.', 404);
    }

    await this.productsRepository.deleteProduct(id);
  }
}

export { DeleteProductUseCase };
