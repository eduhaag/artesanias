import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangeStatusPurchaseUseCase } from './ChangeStatusPurchaseUseCase';

class ChangeStatusPurchaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, status } = req.body;

    const changeStatusPurchaseUseCase = container.resolve(
      ChangeStatusPurchaseUseCase,
    );

    await changeStatusPurchaseUseCase.execute(id, status);

    return res.status(204).send();
  }
}

export { ChangeStatusPurchaseController };
