import { inject, injectable } from 'tsyringe';

import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

@injectable()
class GetClientByTaxUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute(taxCode: string): Promise<Client> {
    const client = await this.clientsRepository.getClientByTaxCode(taxCode);

    return client;
  }
}

export { GetClientByTaxUseCase };
