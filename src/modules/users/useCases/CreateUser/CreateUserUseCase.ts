import bcrypt from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ name, email, password }: ICreateUserDTO): Promise<User> {
    const userAlreadyExisits = await this.usersRepository.findByEmail(email);

    if (userAlreadyExisits) {
      throw new AppError('User e-mail already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      hashedPassword,
    });

    return user;
  }
}

export { CreateUserUseCase };
