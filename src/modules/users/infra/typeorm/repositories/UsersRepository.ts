import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import { User } from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async updateAdminField(userId: string, isAdmin: boolean): Promise<void> {
    await this.repository.update(userId, { isAdmin });
  }

  async delete(userid: string): Promise<void> {
    await this.repository.softDelete(userid);
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await this.repository.update(userId, { hashedPassword });
  }

  async findByID(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async create({ name, email, hashedPassword }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      hashedPassword,
    });

    const userCreated = await this.repository.save(user);

    return userCreated;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.repository.findOne({ email });

    return user;
  }

  async list(): Promise<User[]> {
    const allUsers = await this.repository.find();

    return allUsers;
  }
}

export { UsersRepository };
