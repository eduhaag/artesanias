import { getRepository, Repository } from 'typeorm';

import { IAddressDTO } from '@modules/clients/dtos/IAddressDTO';
import { IAddressRepository } from '@modules/clients/repositories/IAddressRepository';

import { Address } from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private repository: Repository<Address>;

  constructor() {
    this.repository = getRepository(Address);
  }

  async createAddress({
    clientId,
    destinatary,
    zipCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    main,
  }: IAddressDTO): Promise<Address> {
    const address = this.repository.create({
      clientId,
      destinatary,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      main,
    });

    await this.repository.save(address);

    return address;
  }

  async updateAddress({
    id,
    clientId,
    destinatary,
    zipCode,
    street,
    number,
    complement,
    district,
    city,
    state,
    main,
  }: IAddressDTO): Promise<void> {
    await this.repository.update(id, {
      clientId,
      destinatary,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      main,
    });
  }

  async deleteAddress(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getMainAddressByClient(clientId: string): Promise<Address> {
    const address = await this.repository.findOne({
      where: { clientId, main: true },
    });

    return address;
  }

  async getAddressById(id: number): Promise<Address> {
    const address = await this.repository.findOne(id);

    return address;
  }
}

export { AddressRepository };
