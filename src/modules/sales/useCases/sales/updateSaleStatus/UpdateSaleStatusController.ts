import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSaleStatusUseCase } from './UpdateSaleStatusUseCase';

class UpdateSaleStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { saleId, statusId } = req.body;

    const updateSaleStatusUseCase = container.resolve(UpdateSaleStatusUseCase);

    await updateSaleStatusUseCase.execute(saleId, statusId);

    return res.status(204).send();
  }
}

export { UpdateSaleStatusController };
