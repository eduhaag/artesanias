import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { GetPurchaseByIDUseCase } from './GetPurchaseByIDUseCase';

class GetPurchaseByIDController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const getPurchaseByIDUseCase = container.resolve(GetPurchaseByIDUseCase);

    const purchase = await getPurchaseByIDUseCase.execute(id);

    return res.json(purchase);
  }
}

export { GetPurchaseByIDController };
