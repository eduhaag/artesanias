import { IRefreshTokenDTO } from '../dtos/IRefreshTokenDTO';
import { UserToken } from '../infra/typeorm/entities/UserToken';

interface IRefreshTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: IRefreshTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}

export { IRefreshTokensRepository };
