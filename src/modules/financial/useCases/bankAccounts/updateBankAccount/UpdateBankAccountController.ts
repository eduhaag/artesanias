import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateBankAccountUseCase } from './UpdateBankAccountUseCase';

class UpdateBankAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, name, startingBalance } = req.body;

    const updateBankAccountUseCase = container.resolve(
      UpdateBankAccountUseCase,
    );

    await updateBankAccountUseCase.execute({ id, name, startingBalance });

    return res.status(204).send();
  }
}

export { UpdateBankAccountController };
