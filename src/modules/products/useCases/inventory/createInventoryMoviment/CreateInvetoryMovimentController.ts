import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateInvetoryMovimentUseCase } from './CreateInventoryMovimentUseCase';

class CreateInvetoryMovimentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { materialId, quantity, history, type, coast, purchaseId, saleId } =
      req.body;

    const createInvetoryMovimentUseCase = container.resolve(
      CreateInvetoryMovimentUseCase,
    );

    await createInvetoryMovimentUseCase.execute({
      materialId,
      quantity,
      history,
      type,
      coast,
      purchaseId,
      saleId,
    });

    return res.status(204).send();
  }
}

export { CreateInvetoryMovimentController };
