import { getRepository, Repository } from 'typeorm';

import { IClientDTO } from '@modules/clients/dtos/IClientDTO';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';

import { Client } from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private repostiroy: Repository<Client>;

  constructor() {
    this.repostiroy = getRepository(Client);
  }

  async createClient({
    name,
    acceptMarketing,
    birthday,
    taxCode,
    email,
    phone,
    addresses,
  }: IClientDTO): Promise<Client> {
    const client = this.repostiroy.create({
      name,
      acceptMarketing,
      birthday,
      email,
      taxCode,
      phone,
      addresses,
    });

    await this.repostiroy.save(client);

    return client;
  }

  async updateClient({
    id,
    name,
    acceptMarketing,
    birthday,
    taxCode,
    email,
    phone,
  }: IClientDTO): Promise<void> {
    await this.repostiroy.update(id, {
      name,
      acceptMarketing,
      birthday,
      taxCode,
      email,
      phone,
    });
  }

  async getClientById(id: string): Promise<Client> {
    const client = await this.repostiroy.findOne(id);

    return client;
  }

  async getClientByTaxCode(taxCode: string): Promise<Client> {
    const client = await this.repostiroy.findOne({
      where: { taxCode },
      relations: ['addresses'],
    });

    return client;
  }

  async listAllClients(): Promise<Client[]> {
    const clients = await this.repostiroy.find({ relations: ['addresses'] });

    return clients;
  }

  async deleteClient(id: string): Promise<void> {
    await this.repostiroy.softDelete(id);
  }

  async changeClientPassword(
    id: string,
    hashedPassword: string,
  ): Promise<void> {
    await this.repostiroy.update(id, { hashedPassword });
  }
}

export { ClientsRepository };
