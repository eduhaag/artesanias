import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(userId: string): Promise<void> {
    const checkUserExist = await this.usersRepository.findByID(userId);

    if (!checkUserExist) {
      throw new AppError('User not found.', 404);
    }

    await this.usersRepository.delete(userId);
  }
}

export { DeleteUserUseCase };
