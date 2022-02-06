import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePaymentMethodUseCase } from './UpdatePaymentMethodUseCase';

class UpdatePaymentMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      name,
      description,
      destinationAccount,
      fixRate,
      variableRate,
      creditTime,
    } = req.body;

    const updatePaymentMethodUseCase = container.resolve(
      UpdatePaymentMethodUseCase,
    );

    await updatePaymentMethodUseCase.execute({
      id,
      name,
      description,
      destinationAccount,
      fixRate,
      variableRate,
      creditTime,
    });

    return res.status(204).send();
  }
}

export { UpdatePaymentMethodController };
