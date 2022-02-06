import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPaymentMethodsUseCase } from './ListPaymentMethodsUseCase';

class ListPaymentMethodsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listPaymentMethodsUseCase = container.resolve(
      ListPaymentMethodsUseCase,
    );

    const methods = await listPaymentMethodsUseCase.execute();

    return res.json(methods);
  }
}

export { ListPaymentMethodsController };
