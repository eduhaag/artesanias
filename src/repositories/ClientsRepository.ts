import { EntityRepository, Repository } from 'typeorm';

import Client from '../models/Client';

@EntityRepository(Client)
class ClientsRepository extends Repository<Client> {
  public async findClientByEmail(email: string): Promise<Client | null> {
    const findClient = await this.findOne({
      where: {
        email,
      },
    });

    return findClient || null;
  }
}

export default ClientsRepository;
