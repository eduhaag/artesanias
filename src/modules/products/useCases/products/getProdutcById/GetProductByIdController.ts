import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetProductByIdUseCase } from './GetProductByIdUseCase';

class GetProductByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { relations } = request.query;

    let relationsParsed;

    if (relations) {
      relationsParsed = relations.toString().replace(/ /g, '').split(',');
    }

    const getProductByIdUseCase = container.resolve(GetProductByIdUseCase);

    const product = await getProductByIdUseCase.execute(id, relationsParsed);

    return response.json(product);
  }
}

export { GetProductByIdController };
