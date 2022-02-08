import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSaleStatusUseCase } from './ListSaleStatusUseCase';

class ListSaleStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSaleStatusUseCase = container.resolve(ListSaleStatusUseCase);

    const list = await listSaleStatusUseCase.execute();

    return res.json(list);
  }
}

export { ListSaleStatusController };
