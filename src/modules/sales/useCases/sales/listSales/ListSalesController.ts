import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListSalesUseCase } from './ListSalesUseCase';

class ListSalesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      channels,
      client,
      iniDateFrom,
      iniDateTo,
      sendDateFrom,
      sendDateTo,
      status,
    } = req.query;

    const listSalesUseCase = container.resolve(ListSalesUseCase);

    const sales = await listSalesUseCase.execute({
      channels: channels as string,
      client: client as string,
      iniDateFrom: iniDateFrom as string,
      iniDateTo: iniDateTo as string,
      sendDateFrom: sendDateFrom as string,
      sendDateTo: sendDateTo as string,
      status: status as string,
    });

    return res.json(sales);
  }
}

export { ListSalesController };
