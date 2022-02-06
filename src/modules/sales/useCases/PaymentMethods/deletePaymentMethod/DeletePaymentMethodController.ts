import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeletePaymentMethodUseCase } from './DeletePaymentMethodUseCase';

class DeletePaymentMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deletePaymentMethodUseCase = container.resolve(
      DeletePaymentMethodUseCase,
    );

    await deletePaymentMethodUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeletePaymentMethodController };
