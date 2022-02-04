import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateShippingMethodUseCase } from './CreateShippingMethodUseCase';

class CreateShippingMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createShippingMethodUseCase = container.resolve(
      CreateShippingMethodUseCase,
    );

    const method = await createShippingMethodUseCase.execute({
      name,
      description,
    });

    return res.json(method);
  }
}

export { CreateShippingMethodController };
