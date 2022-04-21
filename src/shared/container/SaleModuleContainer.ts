import { container } from 'tsyringe';

import { PaymentMethodsRepository } from '@modules/sales/infra/typeorm/repositories/PaymentMethodsRepository';
import { SaleChannelsRepository } from '@modules/sales/infra/typeorm/repositories/SaleChannelsRepository';
import { SaleProductsRepository } from '@modules/sales/infra/typeorm/repositories/SaleProductsRepository';
import { SalesHistoryRepository } from '@modules/sales/infra/typeorm/repositories/SalesHistoryRepository';
import { SalesRepository } from '@modules/sales/infra/typeorm/repositories/SalesRepository';
import { SaleStatusRepository } from '@modules/sales/infra/typeorm/repositories/SaleStatusRepository';
import { ShippingMethodsRepository } from '@modules/sales/infra/typeorm/repositories/ShippingMethodsRepository';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { ISaleProductsRepository } from '@modules/sales/repositories/ISaleProductsRepository';
import { ISalesHistoryRepository } from '@modules/sales/repositories/ISalesHistoryRepository';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';

container.registerSingleton<ISalesRepository>(
  'SalesRepository',
  SalesRepository,
);

container.registerSingleton<ISaleChannelsRepository>(
  'SaleChannelsRepository',
  SaleChannelsRepository,
);

container.registerSingleton<ISaleStatusRepository>(
  'SaleStatusRepository',
  SaleStatusRepository,
);

container.registerSingleton<IPaymentMethodsRepository>(
  'PaymentMethodsRepository',
  PaymentMethodsRepository,
);

container.registerSingleton<IShippingMethodsRepository>(
  'ShippingMethodsRepository',
  ShippingMethodsRepository,
);

container.registerSingleton<ISalesHistoryRepository>(
  'SalesHistoryRepository',
  SalesHistoryRepository,
);

container.registerSingleton<ISaleProductsRepository>(
  'SaleProductsRepository',
  SaleProductsRepository,
);
