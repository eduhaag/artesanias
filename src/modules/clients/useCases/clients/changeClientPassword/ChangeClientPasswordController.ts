import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ChangeClientPasswordUseCase } from './ChangeClientPasswordUseCase';

class ChangeClientPasswordController {
  async handle(req: Request, resp: Response): Promise<Response> {
    const { id, oldPassword, newPassword } = req.body;

    const changeClientPasswordUseCase = container.resolve(
      ChangeClientPasswordUseCase,
    );

    await changeClientPasswordUseCase.execute({ id, oldPassword, newPassword });

    return resp.status(204).send();
  }
}

export { ChangeClientPasswordController };
