import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateLedgerUseCase } from './UpdateLedgerUseCase';

class UpdateLedgerController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, description, type, groupId } = req.body;

    const updateLedgerUseCase = container.resolve(UpdateLedgerUseCase);

    await updateLedgerUseCase.execute({ id, description, type, groupId });

    return res.status(204).send();
  }
}

export { UpdateLedgerController };
