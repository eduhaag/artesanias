import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateProductCategoryUseCase } from './CreateProductCategoryUseCase';

class CreateProductCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createProductCategoryUseCase = container.resolve(
      CreateProductCategoryUseCase,
    );
    const category = await createProductCategoryUseCase.execute({
      name,
      description,
    });

    return response.status(201).json(category);
  }
}

export { CreateProductCategoryController };
