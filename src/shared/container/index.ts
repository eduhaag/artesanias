import { container } from 'tsyringe';

import '@shared/container/providers';
import './SaleModuleContainer';
import './ProductsModuleContainer';
import './ClientsModuleContainer';
import './FinancialModuleContainer';

import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

// IUserRepository
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
