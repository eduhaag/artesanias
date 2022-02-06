import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePaymentMethodUseCase } from './CreatePaymentMethodUseCase';

class CreatePaymentMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      destinationAccount,
      fixRate,
      variableRate,
      creditTime,
    } = req.body;

    const createPaymentMethodUseCase = container.resolve(
      CreatePaymentMethodUseCase,
    );

    const method = await createPaymentMethodUseCase.execute({
      name,
      description,
      destinationAccount,
      fixRate,
      variableRate,
      creditTime,
    });

    return res.json(method);
  }
}

export { CreatePaymentMethodController };
