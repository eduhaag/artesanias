import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePurchaseUseCase } from './UpdatePurchaseUseCase';

class UpdatePurchaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      addition,
      discount,
      invoice,
      observations,
      shippingCoast,
      installments,
    } = req.body;

    const updatePurchaseUseCase = container.resolve(UpdatePurchaseUseCase);

    await updatePurchaseUseCase.execute({
      id,
      addition,
      discount,
      invoice,
      observations,
      shippingCoast,
      installments,
    });

    return res.status(204).send();
  }
}

export { UpdatePurchaseController };
