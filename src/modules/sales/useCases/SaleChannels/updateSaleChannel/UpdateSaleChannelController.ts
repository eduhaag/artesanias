import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateSaleChannelUseCase } from './UpdateSaleChannelUseCase';

class UpdateSaleChannelController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id, name, description } = req.body;

    const updateSaleChannelUseCase = container.resolve(
      UpdateSaleChannelUseCase,
    );

    await updateSaleChannelUseCase.execute({
      id,
      name,
      description,
    });

    return res.status(204).send();
  }
}

export { UpdateSaleChannelController };
