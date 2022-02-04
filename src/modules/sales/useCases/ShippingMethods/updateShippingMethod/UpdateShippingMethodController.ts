import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateShippingMethodUseCase } from './UpdateShippingMethodUseCase';

class UpdateShippingMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, name, description } = req.body;

    const updateShippingMethodUseCase = container.resolve(
      UpdateShippingMethodUseCase,
    );

    await updateShippingMethodUseCase.execute({ id, name, description });

    return res.status(204).send();
  }
}

export { UpdateShippingMethodController };
