import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteSaleProductUseCase } from './DeleteSaleProductUseCase';

class DeleteSaleProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    const deleteSaleProductUseCase = container.resolve(
      DeleteSaleProductUseCase,
    );

    await deleteSaleProductUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteSaleProductController };
