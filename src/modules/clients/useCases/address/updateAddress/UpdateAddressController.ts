import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAddressUseCase } from './UpdateAddressUseCase';

class UpdateAddressController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      id,
      clientId,
      destinatary,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      main,
    } = req.body;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    await updateAddressUseCase.execute({
      id,
      clientId,
      destinatary,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      main,
    });

    return res.status(204).send();
  }
}

export { UpdateAddressController };
