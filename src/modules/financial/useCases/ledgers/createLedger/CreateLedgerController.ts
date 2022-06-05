import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateLedgerUseCase } from './CreateLedgerUseCase';

class CreateLedgerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { description, type, groupId } = req.body;

    const createLedgerUseCase = container.resolve(CreateLedgerUseCase);

    const ledger = await createLedgerUseCase.execute({
      description,
      type,
      groupId,
    });

    return res.json(ledger).status(201);
  }
}

export { CreateLedgerController };
