import { container } from 'tsyringe';

import { AddressRepository } from '@modules/clients/infra/typeorm/repositories/AddressRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { IAddressRepository } from '@modules/clients/repositories/IAddressRepository';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { BankAccountsRepository } from '@modules/financial/infra/typeorm/repositories/BankAccountsRepository';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { ProductCategoriesRepository } from '@modules/products/infra/typeorm/repositories/ProductCategoriesRepository';
import { ProductCompositionsRepository } from '@modules/products/infra/typeorm/repositories/ProductCompositionsRepository';
import { ProductPicturesRepository } from '@modules/products/infra/typeorm/repositories/ProductPicturesRepository';
import { ProductsRepository } from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IProductCategoriesRepository } from '@modules/products/repositories/IProductCategoriesRepository';
import { IProductCompositionsRepository } from '@modules/products/repositories/IProductCompositionsRepository';
import { IProductPicturesRepository } from '@modules/products/repositories/IProductPicturesRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { PaymentMethodsRepository } from '@modules/sales/infra/typeorm/repositories/PaymentMethodsRepository';
import { SaleChannelsRepository } from '@modules/sales/infra/typeorm/repositories/SaleChannelsRepository';
import { SaleStatusRepository } from '@modules/sales/infra/typeorm/repositories/SaleStatusRepository';
import { ShippingMethodsRepository } from '@modules/sales/infra/typeorm/repositories/ShippingMethodsRepository';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

// ICategoryRepositoy
container.registerSingleton<IProductCategoriesRepository>(
  'ProductCategoriesRepository',
  ProductCategoriesRepository,
);

// IPictureRepository
container.registerSingleton<IProductPicturesRepository>(
  'ProductPicturesRepository',
  ProductPicturesRepository,
);

// IProductCompositionRepository
container.registerSingleton<IProductCompositionsRepository>(
  'ProductCompositionsRepository',
  ProductCompositionsRepository,
);

// IProductRepository
container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

// IUserRepository
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

// ClientsRepository
container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

// Address Repository
container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);

// Bank Account Repository
container.registerSingleton<IBankAccountsRepository>(
  'BankAccountsRepository',
  BankAccountsRepository,
);

// shipping Method
container.registerSingleton<IShippingMethodsRepository>(
  'ShippingMethodsRepository',
  ShippingMethodsRepository,
);

container.registerSingleton<IPaymentMethodsRepository>(
  'PaymentMethodsRepository',
  PaymentMethodsRepository,
);

container.registerSingleton<ISaleStatusRepository>(
  'SaleStatusRepository',
  SaleStatusRepository,
);

container.registerSingleton<ISaleChannelsRepository>(
  'SaleChannelsRepository',
  SaleChannelsRepository,
);
