import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UserRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async updateAdminField(userId: string, isAdmin: boolean): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === userId);

    this.users[userIndex].isAdmin = isAdmin;
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, hashedPassword }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      hashedPassword,
    });

    this.users.push(user);

    return user;
  }

  async list(): Promise<User[]> {
    return this.users;
  }

  async findByID(id: string): Promise<User> {
    return this.users.find(user => user.id === id);
  }

  async updatePassword(userid: string, hashedPassword: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === userid);

    this.users[userIndex].hashedPassword = hashedPassword;
  }

  async delete(userId: string): Promise<void> {
    const userIndex = this.users.findIndex(user => user.id === userId);

    this.users.splice(userIndex, 1);
  }
}

export { UserRepositoryInMemory };
