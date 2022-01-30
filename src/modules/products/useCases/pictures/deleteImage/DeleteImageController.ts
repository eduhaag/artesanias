import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteImageUseCase } from './DeleteImageUseCase';

class DeleteImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { imageId } = request.params;

    const deleteImageUseCase = container.resolve(DeleteImageUseCase);

    await deleteImageUseCase.execute(parseInt(imageId, 10));

    return response.status(204).send();
  }
}

export { DeleteImageController };
