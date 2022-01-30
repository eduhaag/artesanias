import { UserRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/users/useCases/CreateUser/CreateUserUseCase';
import { AppError } from '@shared/errors/AppError';

let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Create user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password: 'passwordTest',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user if email already exists.', async () => {
    await expect(async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@mail.com',
        password: 'passwordTest',
      };

      await createUserUseCase.execute(user);

      await createUserUseCase.execute(user);
    }).rejects.toBeInstanceOf(AppError);
  });
});
