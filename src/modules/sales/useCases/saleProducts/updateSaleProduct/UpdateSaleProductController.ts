import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSaleProductUseCase } from './UpdateSaleProductUseCase';

class UpdateSaleProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { price, quantity, discount, id, observations, theme } = req.body;

    const updateSaleProductUseCase = container.resolve(
      UpdateSaleProductUseCase,
    );

    await updateSaleProductUseCase.execute({
      price,
      quantity,
      discount,
      id,
      observations,
      theme,
    });

    return res.status(204).send();
  }
}

export { UpdateSaleProductController };
