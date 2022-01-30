import { IClientDTO } from '../dtos/IClientDTO';
import { Client } from '../infra/typeorm/entities/Client';

interface IClientsRepository {
  createClient({
    name,
    acceptMarketing,
    birthday,
    taxCode,
    email,
    phone,
    addresses,
  }: IClientDTO): Promise<Client>;
  updateClient({
    id,
    name,
    acceptMarketing,
    birthday,
    taxCode,
    email,
    phone,
  }: IClientDTO): Promise<void>;
  getClientById(id: string): Promise<Client>;
  getClientByTaxCode(taxCode: string): Promise<Client>;
  listAllClients(): Promise<Client[]>;
  deleteClient(id: string): Promise<void>;
  changeClientPassword(id: string, hashedPassword: string): Promise<void>;
}

export { IClientsRepository };
