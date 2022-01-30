import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { User } from '../infra/typeorm/entities/User';

interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  create({ name, email, hashedPassword }: ICreateUserDTO): Promise<User>;
  list(): Promise<User[]>;
  findByID(id: string): Promise<User>;
  updatePassword(userid: string, hashedPassword: string): Promise<void>;
  delete(userid: string): Promise<void>;
  updateAdminField(userId: string, isAdmin: boolean): Promise<void>;
}

export { IUsersRepository };
