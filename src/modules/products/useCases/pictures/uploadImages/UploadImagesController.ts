import { Request, Response } from 'express';
import { container } from 'tsyringe';
import {} from 'multer';

import { UploadImagesUseCase } from './UploadImagesUseCase';

class UploadImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.body;
    const { path } = request.file;

    const uploadImagesUseCase = container.resolve(UploadImagesUseCase);

    const image = await uploadImagesUseCase.execute({ productId, path });

    return response.status(204).json(image);
  }
}

export { UploadImagesController };
