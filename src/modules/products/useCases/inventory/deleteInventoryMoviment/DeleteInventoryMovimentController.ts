import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteInventoryMovimentUseCase } from './DeleteInventoryMovimentUseCase';

class DeleteInventoryMovimentController {
  async handle(req: Request, res: Response): Promise<Response> {
    const id = parseInt(req.params.id, 10);

    const deleteInventoryMovimentUseCase = container.resolve(
      DeleteInventoryMovimentUseCase,
    );

    await deleteInventoryMovimentUseCase.execute(id);

    return res.status(204).send();
  }
}

export { DeleteInventoryMovimentController };
