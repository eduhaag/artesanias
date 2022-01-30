import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      categoryId,
      name,
      description,
      coast,
      price,
      type,
      movesStock,
      toSale,
      observations,
      composition,
    } = request.body;

    const createProductUseCase = container.resolve(CreateProductUseCase);

    const product = await createProductUseCase.execute({
      categoryId,
      name,
      description,
      coast,
      price,
      type,
      movesStock,
      toSale,
      observations,
      composition,
    });

    return response.status(201).json(product);
  }
}

export { CreateProductController };
