import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadImagesUseCase } from './UploadImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params;
    let images = request.files as unknown as IFiles[];

    images = Array.isArray(images) ? images : [images];

    const fileNames = images.map(file => file.filename);

    const uploadImagesUseCase = container.resolve(UploadImagesUseCase);

    await uploadImagesUseCase.execute({
      images: fileNames,
      productId,
    });

    return response.status(204).send();
  }
}

export { UploadImagesController };
