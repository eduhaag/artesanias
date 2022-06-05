import { container } from 'tsyringe';

import { BankAccountsRepository } from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';
import { LedgersRepository } from '@modules/financial/infra/typeorm/repositories/LedgersRepository';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

container.registerSingleton<ILedgersRepository>(
  'LedgersRepository',
  LedgersRepository,
);
