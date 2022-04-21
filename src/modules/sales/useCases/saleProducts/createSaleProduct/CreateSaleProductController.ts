import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleProductUseCase } from './CreateSaleProductUseCase';

class CreateSaleProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      price,
      productId,
      quantity,
      discount,
      observations,
      theme,
      saleId,
    } = req.body;

    const createSaleProductUseCase = container.resolve(
      CreateSaleProductUseCase,
    );

    const saleProduct = await createSaleProductUseCase.execute({
      price,
      productId,
      quantity,
      saleId,
      discount,
      observations,
      theme,
    });

    return res.json({ saleProduct });
  }
}

export { CreateSaleProductController };
