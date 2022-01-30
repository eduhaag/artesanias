import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserPasswordUseCase } from './UpdateUserPasswordUseCase';

class UpdateUserPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { newPassword, oldPassword } = request.body;

    const updateUserPasswordUseCase = container.resolve(
      UpdateUserPasswordUseCase,
    );

    await updateUserPasswordUseCase.execute(userId, oldPassword, newPassword);

    return response.send();
  }
}

export { UpdateUserPasswordController };
