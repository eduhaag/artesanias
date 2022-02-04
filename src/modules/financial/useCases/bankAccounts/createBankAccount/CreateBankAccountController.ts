import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateBankAccountUseCase } from './CreateBankAccountUseCase';

class CreateBankAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, startingBalance } = req.body;

    const createBankAccountUseCase = container.resolve(
      CreateBankAccountUseCase,
    );

    const account = await createBankAccountUseCase.execute({
      name,
      startingBalance,
    });

    return res.json(account);
  }
}

export { CreateBankAccountController };
