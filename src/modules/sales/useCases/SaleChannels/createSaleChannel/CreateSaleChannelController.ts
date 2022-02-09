import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleChannelUseCase } from './CreateSaleChannelUseCase';

class CreateSaleChannelController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSaleChannelUseCase = container.resolve(
      CreateSaleChannelUseCase,
    );

    const channel = await createSaleChannelUseCase.execute({
      name,
      description,
    });

    return res.json(channel);
  }
}

export { CreateSaleChannelController };
