import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllAccountsUseCase } from './ListAllAccountsUseCase';

class ListAllAccountsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllAccountsUseCase = container.resolve(ListAllAccountsUseCase);

    const accounts = await listAllAccountsUseCase.execute();

    return res.json(accounts);
  }
}

export { ListAllAccountsController };
