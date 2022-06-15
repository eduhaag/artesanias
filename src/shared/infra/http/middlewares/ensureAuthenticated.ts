import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { RefreshTokensRepository } from '@modules/users/infra/typeorm/repositories/RefreshTokensRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
  name: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;
  const userTokenRepository = new RefreshTokensRepository();

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload;

    const user = await userTokenRepository.findByUserIdAndRefreshToken(
      userId,
      token,
    );

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    request.user = {
      id: userId,
    };

    next();
  } catch {
    throw new AppError('Invalid Token.', 401);
  }
}
