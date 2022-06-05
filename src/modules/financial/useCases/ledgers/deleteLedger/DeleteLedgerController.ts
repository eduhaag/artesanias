import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteLedgerUseCase } from './DeleteLedgerUseCase';

class DeleteLedgerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;

    const deleteLedgerUseCase = container.resolve(DeleteLedgerUseCase);

    await deleteLedgerUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeleteLedgerController };
