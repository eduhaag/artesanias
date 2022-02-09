import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSaleChannelsUseCase } from './ListSaleChannelsUseCase';

class ListSaleChannelsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSaleChannelsUseCase = container.resolve(ListSaleChannelsUseCase);

    const channels = await listSaleChannelsUseCase.execute();

    return res.json(channels).send();
  }
}

export { ListSaleChannelsController };
