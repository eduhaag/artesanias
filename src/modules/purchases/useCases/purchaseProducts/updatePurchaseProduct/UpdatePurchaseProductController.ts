import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdatePurchaseProductUseCase } from './UpdatePurchaseProductUseCase';

class UpdatePurchaseProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, quantity, price, reference } = req.body;

    const updatePurchaseProductUseCase = container.resolve(
      UpdatePurchaseProductUseCase,
    );

    await updatePurchaseProductUseCase.execute({
      id,
      quantity,
      price,
      reference,
    });

    return res.status(204).send();
  }
}

export { UpdatePurchaseProductController };
