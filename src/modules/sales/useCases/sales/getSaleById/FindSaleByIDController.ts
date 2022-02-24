import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { FindSaleByIdUseCase } from './FindSaleByIDUseCase';

class FindSaleByIDController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findSaleByIDUseCase = container.resolve(FindSaleByIdUseCase);

    const sale = await findSaleByIDUseCase.execute(parseInt(id, 10));

    return res.json(sale);
  }
}

export { FindSaleByIDController };
