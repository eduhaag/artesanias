import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DeleteAddressUseCase } from './DeleteAddressUseCase';

class DeleteAddressController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteAddressUseCase = container.resolve(DeleteAddressUseCase);

    await deleteAddressUseCase.execute(parseInt(id, 10));

    return res.status(204).send();
  }
}

export { DeleteAddressController };
