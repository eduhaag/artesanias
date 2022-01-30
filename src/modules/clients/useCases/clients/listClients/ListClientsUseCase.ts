import { inject, injectable } from 'tsyringe';

import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

@injectable()
class ListClientsUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(): Promise<Client[]> {
    const clients = await this.clientsRepository.listAllClients();

    return clients;
  }
}

export { ListClientsUseCase };
