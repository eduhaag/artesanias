import { getRepository, Repository } from 'typeorm';

import { IUpdatePictureDTO } from '@modules/products/dtos/IUpdatePictureDataDTO';
import { IUploadImageDTO } from '@modules/products/dtos/IUploadImageDTO';
import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';

import { ProductPicture } from '../entities/ProductPicture';

class ProductPicturesRepository implements IProductPicturesRepository {
  private repository: Repository<ProductPicture>;

  constructor() {
    this.repository = getRepository(ProductPicture);
  }

  async findByPrincipal(productId: string): Promise<ProductPicture> {
    const principalPicture = await this.repository.findOne({
      where: { productId, principal: true },
    });

    return principalPicture;
  }

  async updatePictureData({
    altText,
    id,
    principal,
  }: IUpdatePictureDTO): Promise<void> {
    await this.repository.update(id, { altText, principal });
  }

  async findPictureById(pictureId: number): Promise<ProductPicture> {
    const picture = await this.repository.findOne(pictureId);

    return picture;
  }

  async deletePicture(pictureId: number): Promise<void> {
    await this.repository.delete({ id: pictureId });
  }

  async listPicturesByProductId(productId: string): Promise<ProductPicture[]> {
    const pictures = await this.repository.find({ where: [productId] });

    return pictures;
  }

  async createPicture({
    imageName,
    productId,
  }: IUploadImageDTO): Promise<void> {
    const newPicture = this.repository.create({ productId, path: imageName });

    await this.repository.save(newPicture);
  }
}

export { ProductPicturesRepository };
