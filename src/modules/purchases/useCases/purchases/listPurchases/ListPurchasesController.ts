import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListPurchasesUseCase } from './ListPurchasesUseCase';

class ListPurchasesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const status = req.query.status as string;
    const date = req.query.date as string;

    let parsedDate;

    if (date) {
      parsedDate = JSON.parse(date);
    }

    const listPurchasesUseCase = container.resolve(ListPurchasesUseCase);

    const purchases = await listPurchasesUseCase.execute({
      status,
      date: parsedDate,
    });

    return res.json(purchases);
  }
}

export { ListPurchasesController };
