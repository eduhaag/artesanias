import { inject, injectable } from 'tsyringe';

import { IUploadImageDTO } from '@modules/products/dtos/IUploadImageDTO';
import { ProductPicture } from '@modules/products/infra/typeorm/entities/ProductPicture';
import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UploadImagesUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductPicturesRepository')
    private productPicturesRepository: IProductPicturesRepository,
  ) {}

  async execute({ path, productId }: IUploadImageDTO): Promise<ProductPicture> {
    const checkProductExists = await this.productsRepository.findById(
      productId,
    );

    if (!checkProductExists) {
      throw new AppError('Product does not exists.');
    }

    const image = await this.productPicturesRepository.createPicture({
      path,
      productId,
    });

    return image;
  }
}

export { UploadImagesUseCase };
