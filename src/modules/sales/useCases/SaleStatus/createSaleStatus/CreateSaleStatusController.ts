import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSaleStatusUseCase } from './CreateSaleStatusUseCase';

class CreateSaleStatusController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description, color } = req.body;

    const createSaleStatusUseCase = container.resolve(CreateSaleStatusUseCase);

    const status = await createSaleStatusUseCase.execute({
      name,
      description,
      color,
    });

    return res.json(status);
  }
}

export { CreateSaleStatusController };
