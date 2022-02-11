import { NextFunction, Request, Response } from 'express';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const { id } = req.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findByID(id);

  if (!user.isAdmin) {
    throw new AppError(
      'Permission denied. User must have admin privileges',
      401,
    );
  }

  return next();
}
