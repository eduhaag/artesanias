import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteShippingMethodUseCase } from './DeleteShippingMethodUseCase';

class DeleteShippingMethodController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteShippingMethodUseCase = container.resolve(
      DeleteShippingMethodUseCase,
    );

    await deleteShippingMethodUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeleteShippingMethodController };
