import { container } from 'tsyringe';

import { PurchasesRepository } from '@modules/purchases/infra/typeorm/repositories/PurchasesRepository';
import { SuppliersRepository } from '@modules/purchases/infra/typeorm/repositories/SuppliersRepository';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';

container.registerSingleton<ISuppliersRepository>(
  'SuppliersRepository',
  SuppliersRepository,
);

container.registerSingleton<IPurchasesRepository>(
  'PurchasesRepository',
  PurchasesRepository,
);
