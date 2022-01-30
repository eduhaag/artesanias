import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientControlle {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      name,
      taxCode,
      email,
      phone,
      birthday,
      acceptMarketing,
      addresses,
    } = request.body;

    const createClientUserCase = container.resolve(CreateClientUseCase);

    const client = await createClientUserCase.execute({
      name,
      taxCode,
      email,
      phone,
      birthday,
      acceptMarketing,
      addresses,
    });

    return response.status(201).json(client);
  }
}

export { CreateClientControlle };
