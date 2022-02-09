import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteSaleChannelUseCase } from './DeleteSaleChannelUseCase';

class DeleteSaleChannelController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteSaleChannelUseCase = container.resolve(
      DeleteSaleChannelUseCase,
    );

    await deleteSaleChannelUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeleteSaleChannelController };
