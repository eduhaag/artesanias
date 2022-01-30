import { IUpdatePictureDTO } from '../dtos/IUpdatePictureDataDTO';
import { IUploadImageDTO } from '../dtos/IUploadImageDTO';
import { ProductPicture } from '../infra/typeorm/entities/ProductPicture';

interface IProductPicturesRepository {
  listPicturesByProductId(productId: string): Promise<ProductPicture[]>;
  createPicture(picture: IUploadImageDTO): Promise<ProductPicture>;
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
