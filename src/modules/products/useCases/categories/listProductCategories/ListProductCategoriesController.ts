import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListProductCategoriesUseCase } from './ListProductCategoriesUseCase';

class ListProductCategoriesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductCategoriesUseCase = container.resolve(
      ListProductCategoriesUseCase,
    );

    const allCategories = await listProductCategoriesUseCase.execute();

    return response.json(allCategories);
  }
}

export { ListProductCategoriesController };
