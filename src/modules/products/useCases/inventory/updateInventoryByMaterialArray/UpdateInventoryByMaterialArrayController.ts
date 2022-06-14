import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateInventoryByMaterialArrayUseCase } from './UpdateInventoryByMaterialArrayUseCase';

class UpdateInventoryByMaterialArrayController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { materials } = req.body;

    const updateInventoryByMaterialArrayUseCase = container.resolve(
      UpdateInventoryByMaterialArrayUseCase,
    );

    await updateInventoryByMaterialArrayUseCase.execute(materials);

    return res.status(204).send();
  }
}

export { UpdateInventoryByMaterialArrayController };
