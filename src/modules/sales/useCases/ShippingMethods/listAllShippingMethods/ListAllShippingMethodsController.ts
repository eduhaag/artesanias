import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllShippingMethodsUseCase } from './ListAllShippingMethodsUseCase';

class ListAllShippingMethodsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllShippingMethodUseCase = container.resolve(
      ListAllShippingMethodsUseCase,
    );

    const methods = await listAllShippingMethodUseCase.execute();

    return res.json(methods);
  }
}

export { ListAllShippingMethodsController };
