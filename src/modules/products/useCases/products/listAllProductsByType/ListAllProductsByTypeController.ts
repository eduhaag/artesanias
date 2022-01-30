import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllProductsByTypeUseCase } from './ListAllProductsByTypeUseCase';

class ListAllProductsByTypeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { types } = request.body;

    const listAllProductsByTypeUseCase = container.resolve(
      ListAllProductsByTypeUseCase,
    );

    const products = await listAllProductsByTypeUseCase.execute(types);

    return response.json(products);
  }
}

export { ListAllProductsByTypeController };
