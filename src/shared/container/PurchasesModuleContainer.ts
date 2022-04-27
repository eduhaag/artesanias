import { container } from 'tsyringe';

import { SuppliersRepository } from '@modules/purchases/infra/typeorm/repositories/SuppliersRepository';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);
