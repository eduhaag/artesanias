import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteBankAccountUseCase } from './DeleteBankAccountUseCase';

class DeleteBankAccountController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteBankAccountUseCase = container.resolve(
      DeleteBankAccountUseCase,
    );

    await deleteBankAccountUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeleteBankAccountController };
