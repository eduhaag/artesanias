import { container } from 'tsyringe';

import '@shared/container/providers';
import './SaleModuleContainer';
import './ProductsModuleContainer';
import './ClientsModuleContainer';
import './FinancialModuleContainer';
import './PurchasesModuleContainer';

import { RefreshTokensRepository } from '@modules/users/infra/typeorm/repositories/RefreshTokensRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IRefreshTokensRepository } from '@modules/users/repositories/IRefreshTokensRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

// IUserRepository
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRefreshTokensRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository,
);
