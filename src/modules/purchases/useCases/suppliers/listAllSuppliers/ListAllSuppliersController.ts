import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListAllSuppliersUseCase } from './ListAllSuppliersUseCase';

class ListAllSuppliersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listAllSuppliersUseCase = container.resolve(ListAllSuppliersUseCase);

    const suppliers = await listAllSuppliersUseCase.execute();

    return res.json(suppliers).send();
  }
}

export { ListAllSuppliersController };
