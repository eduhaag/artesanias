import { IUpdatePictureDTO } from '../dtos/IUpdatePictureDataDTO';
import { IUploadImageDTO } from '../dtos/IUploadImageDTO';
import { ProductPicture } from '../infra/typeorm/entities/ProductPicture';

interface IProductPicturesRepository {
  listPicturesByProductId(productId: string): Promise<ProductPicture[]>;
  createPicture({ productId, imageName }: IUploadImageDTO): Promise<void>;
  deletePicture(pictureId: number): Promise<void>;
  findPictureById(pictureId: number): Promise<ProductPicture>;
  findByPrincipal(productId: string): Promise<ProductPicture>;
  updatePictureData({
    altText,
    id,
    principal,
  }: IUpdatePictureDTO): Promise<void>;
}

export { IProductPicturesRepository };
