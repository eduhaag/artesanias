import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { LauchStatementsUseCase } from './LauchStatementsUseCase';

class LauchStatementsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { statementsIds, lauchDate } = req.body;

    const lauchStatementsUseCase = container.resolve(LauchStatementsUseCase);

    await lauchStatementsUseCase.execute(statementsIds, lauchDate);

    return res.status(204).send();
  }
}

export { LauchStatementsController };
