import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePurchaseProductUseCase } from './CreatePurchaseProductUseCase';

class CreatePurchaseProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { price, quantity, productId, purchaseId, reference } = req.body;

    const createPurchaseProductUseCase = container.resolve(
      CreatePurchaseProductUseCase,
    );

    const product = await createPurchaseProductUseCase.execute({
      price,
      quantity,
      productId,
      purchaseId,
      reference,
    });

    return res.json(product);
  }
}

export { CreatePurchaseProductController };
