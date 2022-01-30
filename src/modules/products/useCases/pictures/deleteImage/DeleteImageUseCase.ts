import { injectable, inject } from 'tsyringe';

import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';
import { deleteFile } from '@utils/files';

@injectable()
class DeleteImageUseCase {
  constructor(
    @inject('ProductPicturesRepository')
    private productPicturesRepository: IProductPicturesRepository,
  ) {}

  async execute(imageId: number): Promise<void> {
    const image = await this.productPicturesRepository.findPictureById(imageId);

    await this.productPicturesRepository.deletePicture(imageId);

    await deleteFile(image.path);
  }
}

export { DeleteImageUseCase };
