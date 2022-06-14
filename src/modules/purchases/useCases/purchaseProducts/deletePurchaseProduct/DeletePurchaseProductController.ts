import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeletePurchaseProductUseCase } from './DeletePurchaseProductUseCase';

class DeletePurchaseProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    const deletePurchaseProductUseCase = container.resolve(
      DeletePurchaseProductUseCase,
    );

    await deletePurchaseProductUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeletePurchaseProductController };
