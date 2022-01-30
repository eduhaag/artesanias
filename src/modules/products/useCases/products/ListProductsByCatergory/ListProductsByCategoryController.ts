import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductsByCategoryUseCase } from './ListProductsByCategoryUseCase';

class ListProductsByCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { categoryId } = request.query;
    const categoryIdNumber = parseInt(categoryId.toString(), 10);

    const listProductsByCategoryUseCase = container.resolve(
      ListProductsByCategoryUseCase,
    );

    const products = await listProductsByCategoryUseCase.execute(
      categoryIdNumber,
    );
    return response.json(products);
  }
}

export { ListProductsByCategoryController };
