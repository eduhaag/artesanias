import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateProductCategoryUseCase } from './UpdateProductCategoryUseCase';

class UpdateProductCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, description } = request.body;

    const updateProductCategoryUseCase = container.resolve(
      UpdateProductCategoryUseCase,
    );

    await updateProductCategoryUseCase.execute({
      id: parseInt(id, 10),
      name,
      description,
    });

    return response.status(200).send();
  }
}

export { UpdateProductCategoryController };
