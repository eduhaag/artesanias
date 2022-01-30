import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCompositionUseCase } from './CreateCompositionUseCase';

class CreateCompositionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId, materials } = request.body;

    const createCompositionUseCase = container.resolve(
      CreateCompositionUseCase,
    );

    const compositions = await createCompositionUseCase.execute(
      productId,
      materials,
    );
    return response.status(201).json(compositions);
  }
}

export { CreateCompositionController };
