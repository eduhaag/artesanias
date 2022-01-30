import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductUseCase } from './UpdateProductUseCase';

class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      id,
      categoryId,
      name,
      description,
      coast,
      price,
      type,
      movesStock,
      toSale,
      observations,
    } = request.body;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    await updateProductUseCase.execute({
      id,
      categoryId,
      name,
      description,
      coast,
      price,
      type,
      movesStock,
      toSale,
      observations,
    });

    return response.status(204).send();
  }
}

export { UpdateProductController };
