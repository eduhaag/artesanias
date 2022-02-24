import { container } from 'tsyringe';

import { BankAccountsRepository } from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);
