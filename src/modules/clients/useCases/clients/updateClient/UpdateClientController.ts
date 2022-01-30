import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id, name, acceptMarketing, phone, email, taxCode, birthday } =
      request.body;

    const updateClientUseCase = container.resolve(UpdateClientUseCase);

    await updateClientUseCase.execute({
      id,
      name,
      acceptMarketing,
      phone,
      email,
      taxCode,
      birthday,
    });

    return response.status(204).send();
  }
}

export { UpdateClientController };
