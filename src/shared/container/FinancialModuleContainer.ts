import { container } from 'tsyringe';

import { BankAccountsRepository } from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';
import { LedgersRepository } from '@modules/financial/infra/typeorm/repositories/LedgersRepository';
import { StatementsRepository } from '@modules/financial/infra/typeorm/repositories/StatementsRepository';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';

container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

container.registerSingleton<ILedgersRepository>(
  'LedgersRepository',
  LedgersRepository,
);

container.registerSingleton<IStatementsRepository>(
  'StatementsRepository',
  StatementsRepository,
);
