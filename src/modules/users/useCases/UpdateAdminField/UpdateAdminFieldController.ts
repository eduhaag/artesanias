import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateAdminFieldUseCase } from './UpdateAdminFieldUseCase';

class UpdateAdminFieldController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user } = request;
    const { id, isAdmin } = request.body;

    const updateAdminFieldUseCase = container.resolve(UpdateAdminFieldUseCase);

    await updateAdminFieldUseCase.execute({
      adminId: user.id,
      userId: id,
      isAdmin,
    });

    return response.status(204).send();
  }
}

export { UpdateAdminFieldController };
