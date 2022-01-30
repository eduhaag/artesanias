import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to authenticate an user', async () => {
    const user = {
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'password',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: 'johndoe@mail.com',
      password: 'password',
    });

    expect(result).toHaveProperty('token');
  });

  it('Should not be able to authenticate with an incorrect user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@mail.com',
        password: 'password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with an incorrect password', async () => {
    await expect(async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: 'password',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'johndoe@mail.com',
        password: 'false',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
