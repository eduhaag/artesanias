import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListClientsUseCase } from './ListClientsUseCase';

class ListClientsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listClientsUseCase = container.resolve(ListClientsUseCase);

    const clients = await listClientsUseCase.execute();

    return res.json(clients);
  }
}

export { ListClientsController };
