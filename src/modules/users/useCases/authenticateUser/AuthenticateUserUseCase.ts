import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProveider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RefreshTokensRepository')
    private RefreshTokensRepository: IRefreshTokensRepository,

    @inject('DateProvider')
    private DateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expires_in_token,
      expires_refresh_token,
      secret_refresh_token,
      secret_token,
    } = auth;

    if (!user) {
      throw new AppError('Email or password incorrect.', 401);
    }

    const passwordMatch = await compare(password, user.hashedPassword);
    if (!passwordMatch) {
      throw new AppError('Email or password incorrect.', 401);
    }

    const token = sign(
      {
        userName: user.name,
      },
      secret_token,
      {
        subject: user.id,
        expiresIn: expires_in_token,
      },
    );

    const refreshToken = sign({ userName: user.name }, secret_refresh_token, {
      expiresIn: `${expires_refresh_token}d`,
      subject: user.id,
    });

    await this.RefreshTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: this.DateProvider.addDays(new Date(), expires_refresh_token),
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };
