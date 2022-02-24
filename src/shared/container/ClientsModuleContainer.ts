import { container } from 'tsyringe';

import { AddressRepository } from '@modules/clients/infra/typeorm/repositories/AddressRepository';
import { ClientsRepository } from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import { IAddressRepository } from '@modules/clients/repositories/IAddressRepository';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

// Address Repository
container.registerSingleton<IAddressRepository>(
  'AddressRepository',
  AddressRepository,
);
