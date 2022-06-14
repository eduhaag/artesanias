import { container } from 'tsyringe';

import { PurchaseProductsRepository } from '@modules/purchases/infra/typeorm/repositories/PurchaseProductsRepository';
import { PurchasesRepository } from '@modules/purchases/infra/typeorm/repositories/PurchasesRepository';
import { SuppliersRepository } from '@modules/purchases/infra/typeorm/repositories/SuppliersRepository';
import { IPurchaseProductsRepository } from '@modules/purchases/repositories/IPurchaseProductsRepository';
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

container.registerSingleton<IPurchaseProductsRepository>(
  'PurchaseProductsRepository',
  PurchaseProductsRepository,
);
