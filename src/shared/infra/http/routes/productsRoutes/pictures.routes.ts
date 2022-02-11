import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { DeleteImageController } from '@modules/products/useCases/pictures/deleteImage/DeleteImageController';
import { UpdateImageDataController } from '@modules/products/useCases/pictures/updateImageData/UpdateImageDataController';
import { UploadImagesController } from '@modules/products/useCases/pictures/uploadImages/UploadImagesController';

const picturesRouter = Router();

const upload = multer(uploadConfig.upload('productsPicures'));

const uploadImagesController = new UploadImagesController();
const deleteImageController = new DeleteImageController();
const updateImageDataController = new UpdateImageDataController();

picturesRouter.post(
  '/:productId',
  upload.array('images'),
  uploadImagesController.handle,
);
picturesRouter.delete('/:imageId', deleteImageController.handle);
picturesRouter.put('/', updateImageDataController.handle);

export { picturesRouter };
