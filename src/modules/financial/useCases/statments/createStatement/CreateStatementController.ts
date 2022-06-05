import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateStatementUseCase } from './CreateStatementUseCase';

class CreateStatementController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      bankAccountId,
      ledgerId,
      toFulfilled,
      fulfilledOn,
      description,
      value,
      purchaseId,
      saleId,
    } = req.body;

    const createStatementUseCase = container.resolve(CreateStatementUseCase);

    const statement = await createStatementUseCase.execute({
      bankAccountId,
      ledgerId,
      toFulfilled,
      fulfilledOn,
      description,
      value,
      purchaseId,
      saleId,
    });

    return res.json(statement);
  }
}

export { CreateStatementController };
