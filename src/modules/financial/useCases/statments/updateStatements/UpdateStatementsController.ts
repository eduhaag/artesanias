import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateStatementsUseCase } from './UpdateStatementsUserCase';

class UpdateStatementsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { statements, modifiers } = req.body;

    const updateStatementsUseCase = container.resolve(UpdateStatementsUseCase);

    await updateStatementsUseCase.execute({ statements, modifiers });

    return res.status(204).send();
  }
}

export { UpdateStatementsController };
