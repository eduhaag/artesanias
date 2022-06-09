import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreatePurchaseUseCase } from './CreatePurchaseUseCase';

class CreatePurchaseController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      supplier,
      invoice,
      observations,
      products,
      addition,
      discount,
      shippingCoast,
      installments,
      productsType,
      paymentAccountId,
    } = req.body;

    const createPurchaseUseCase = container.resolve(CreatePurchaseUseCase);

    const purchase = await createPurchaseUseCase.execute({
      supplier,
      invoice,
      observations,
      products,
      addition,
      discount,
      shippingCoast,
      installments,
      productsType,
      paymentAccountId,
    });

    return res.json(purchase);
  }
}

export { CreatePurchaseController };
