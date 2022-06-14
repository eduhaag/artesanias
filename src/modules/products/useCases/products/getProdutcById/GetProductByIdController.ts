import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetProductByIdUseCase } from './GetProductByIdUseCase';

class GetProductByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const getProductByIdUseCase = container.resolve(GetProductByIdUseCase);

    const product = await getProductByIdUseCase.execute(id);

    return response.json(product);
  }
}

export { GetProductByIdController };
