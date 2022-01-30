import { inject, injectable } from 'tsyringe';

import { IClientDTO } from '@modules/clients/dtos/IClientDTO';
import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({
    name,
    taxCode,
    email,
    phone,
    birthday,
    acceptMarketing,
    addresses,
  }: IClientDTO): Promise<Client> {
    const checkIfTaxCodeExists =
      await this.clientsRepository.getClientByTaxCode(taxCode);

    if (checkIfTaxCodeExists) {
      throw new AppError('Client tax code already exists.');
    }

    const client = this.clientsRepository.createClient({
      name,
      acceptMarketing,
      birthday,
      taxCode,
      email,
      phone,
      addresses,
    });

    return client;
  }
}

export { CreateClientUseCase };
