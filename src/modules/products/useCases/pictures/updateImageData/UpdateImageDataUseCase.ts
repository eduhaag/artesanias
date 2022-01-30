import { inject, injectable } from 'tsyringe';

import { IUpdatePictureDTO } from '@modules/products/dtos/IUpdatePictureDataDTO';
import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateImageDataUseCase {
  constructor(
    @inject('ProductPicturesRepository')
    private productPicturesRepository: IProductPicturesRepository,
  ) {}

  async execute({ id, altText, principal }: IUpdatePictureDTO): Promise<void> {
    const checkImageExists =
      await this.productPicturesRepository.findPictureById(id);

    if (!checkImageExists) {
      throw new AppError('Image not found.', 404);
    }

    // find if exists another picture with principal and change
    if (principal) {
      const findIfAlreadyExistsPrincipalImage =
        await this.productPicturesRepository.findByPrincipal(
          checkImageExists.productId,
        );

      if (findIfAlreadyExistsPrincipalImage) {
        const { id, altText } = findIfAlreadyExistsPrincipalImage;
        await this.productPicturesRepository.updatePictureData({
          id,
          altText,
          principal: false,
        });
      }
    }

    await this.productPicturesRepository.updatePictureData({
      id,
      altText,
      principal,
    });
  }
}

export { UpdateImageDataUseCase };
