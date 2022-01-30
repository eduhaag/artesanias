import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllProductsToSaleUseCase } from './ListAllProductsToSaleUseCase';

class ListAllProductsToSaleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { category } = request.query;

    const categoryId = category ? category.toString() : undefined;

    const listAllProductsToSaleUseCase = container.resolve(
      ListAllProductsToSaleUseCase,
    );

    const products = await listAllProductsToSaleUseCase.execute(categoryId);

    return response.json(products);
  }
}

export { ListAllProductsToSaleController };
