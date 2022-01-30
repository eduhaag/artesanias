import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteCompositionUseCase } from './DeleteCompositionUseCase';

class DeleteCompositionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCompositionUseCase = container.resolve(
      DeleteCompositionUseCase,
    );

    await deleteCompositionUseCase.execute(parseInt(id, 10));

    return response.status(204).send();
  }
}

export { DeleteCompositionController };
