import { getRepository, Repository } from 'typeorm';

import { IRefreshTokenDTO } from '@modules/users/dtos/IRefreshTokenDTO';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';

import { UserToken } from '../entities/UserToken';

class RefreshTokensRepository implements IRefreshTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: IRefreshTokenDTO): Promise<UserToken> {
    const token = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    await this.repository.save(token);

    return token;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const tokens = await this.repository.findOne({
      where: { userId, refreshToken },
    });

    return tokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export { RefreshTokensRepository };
