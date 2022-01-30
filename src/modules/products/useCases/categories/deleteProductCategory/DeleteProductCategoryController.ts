import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteProductCategoryUseCase } from './DeleteProductCategoryUseCase';

class DeleteProductCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProductCategoryUseCase = container.resolve(
      DeleteProductCategoryUseCase,
    );

    await deleteProductCategoryUseCase.execute(parseInt(id, 10));

    return response.status(204).send();
  }
}

export { DeleteProductCategoryController };
