import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListLedgersUseCase } from './ListLedgersUseCase';

class ListLedgersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const type = req.query.type as string;
    let typeparsed;

    if (type === '1') {
      typeparsed = 1;
    } else if (type === '-1') {
      typeparsed = -1;
    }

    const listLedgersUseCase = container.resolve(ListLedgersUseCase);

    const ledgers = await listLedgersUseCase.execute(typeparsed);

    return res.json(ledgers);
  }
}

export { ListLedgersController };
