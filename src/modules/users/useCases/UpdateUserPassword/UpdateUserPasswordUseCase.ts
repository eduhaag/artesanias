import bcrypt, { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateUserPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const userInDB = await this.userRepository.findByID(userId);

    if (!userInDB) {
      throw new AppError('User does not exists.', 400);
    }

    const comparePasswords = await compare(
      oldPassword,
      userInDB.hashedPassword,
    );

    if (!comparePasswords) {
      throw new AppError('Password does not match.', 401);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 8);

    await this.userRepository.updatePassword(userId, hashedPassword);
  }
}

export { UpdateUserPasswordUseCase };
