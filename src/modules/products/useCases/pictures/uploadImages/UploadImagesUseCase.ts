import { inject, injectable } from 'tsyringe';

import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  productId: string;
  images: string[];
}

@injectable()
class UploadImagesUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductPicturesRepository')
    private productPicturesRepository: IProductPicturesRepository,
  ) {}

  async execute({ images, productId }: IRequest): Promise<void> {
    const checkProductExists = await this.productsRepository.findById(
      productId,
    );

    if (!checkProductExists) {
      throw new AppError('Product does not exists.');
    }

    images.map(async imageName => {
      await this.productPicturesRepository.createPicture({
        productId,
        imageName,
      });
    });
  }
}

export { UploadImagesUseCase };
