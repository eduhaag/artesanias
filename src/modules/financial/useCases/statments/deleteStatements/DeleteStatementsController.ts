import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteStatementsUseCase } from './DeleteStatementsUseCase';

class DeleteStatementsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { ids } = req.params;

    const idsParsed = ids.split(',');

    const deleteStatementsUseCase = container.resolve(DeleteStatementsUseCase);

    await deleteStatementsUseCase.execute(idsParsed);

    return res.status(204).send();
  }
}

export { DeleteStatementsController };
