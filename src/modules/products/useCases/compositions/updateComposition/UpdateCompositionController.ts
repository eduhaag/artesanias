import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateCompositionUseCase } from './UpdateCompositionUseCase';

class UpdateCompositionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, quantity } = request.body;

    const updateConpositionUseCase = container.resolve(
      UpdateCompositionUseCase,
    );

    await updateConpositionUseCase.execute(id, quantity);

    return response.status(201).send();
  }
}

export { UpdateCompositionController };
