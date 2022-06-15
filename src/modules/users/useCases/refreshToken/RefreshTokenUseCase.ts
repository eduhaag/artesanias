import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProveider';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  mail: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('RefreshTokensRepository')
    private RefreshTokensRepository: IRefreshTokensRepository,

    @inject('DateProvider')
    private DateProvider: IDateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { mail, sub } = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken =
      await this.RefreshTokensRepository.findByUserIdAndRefreshToken(
        sub,
        token,
      );

    if (!userToken) {
      throw new AppError('Refresh token does not exists.', 404);
    }

    await this.RefreshTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ mail }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: `${auth.expires_refresh_token}d`,
    });

    await this.RefreshTokensRepository.create({
      userId: sub,
      refreshToken,
      expiresDate: this.DateProvider.addDays(
        new Date(),
        auth.expires_refresh_token,
      ),
    });

    return refreshToken;
  }
}

export { RefreshTokenUseCase };
