import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IChangeAdminFieldDTO {
  adminId: string;
  userId: string;
  isAdmin: boolean;
}

@injectable()
class UpdateAdminFieldUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    adminId,
    userId,
    isAdmin,
  }: IChangeAdminFieldDTO): Promise<void> {
    if (adminId === userId) {
      throw new AppError('An user cannot change self configuration.', 403);
    }

    const checkUserExists = await this.usersRepository.findByID(userId);

    if (!checkUserExists) {
      throw new AppError('User not found.', 404);
    }

    await this.usersRepository.updateAdminField(userId, isAdmin);
  }
}

export { UpdateAdminFieldUseCase };
