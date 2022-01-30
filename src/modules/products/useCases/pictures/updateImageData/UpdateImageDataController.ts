import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateImageDataUseCase } from './UpdateImageDataUseCase';

class UpdateImageDataController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, altText, principal } = request.body;

    const updateImageDataUseCase = container.resolve(UpdateImageDataUseCase);

    await updateImageDataUseCase.execute({ id, altText, principal });

    return response.send();
  }
}

export { UpdateImageDataController };
