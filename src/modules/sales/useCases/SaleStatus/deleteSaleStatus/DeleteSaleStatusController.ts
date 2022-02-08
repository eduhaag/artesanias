import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteSaleStatusUseCase } from './DeleteSaleStatusUseCase';

class DeleteSaleStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSaleStatusUseCase = container.resolve(DeleteSaleStatusUseCase);

    await deleteSaleStatusUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeleteSaleStatusController };
