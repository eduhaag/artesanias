import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateAddressUseCase } from './CreateAddressUseCase';

class CreateAddressController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
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

    const createAddressUseCase = container.resolve(CreateAddressUseCase);

    const address = await createAddressUseCase.execute({
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

    return res.json(address);
  }
}

export { CreateAddressController };
