import { getCustomRepository, getRepository } from 'typeorm';

import Client from '../models/Client';
import Address from '../models/Address';
import AppError from '../errors/AppError';
import ClientRepository from '../repositories/ClientsRepository';

interface AddressDTO {
  cep: number;
  street: string;
  number: number;
  complement: string;
  district: string;
  city: string;
  state: string;
  principal: true;
}

interface Request {
  name: string;
  email: string;
  cpfCnpj?: string;
  phone?: number;
  birthday?: Date;
  acceptMarketing: true;
  address?: [AddressDTO] | undefined;
}

class CreateClientService {
  public async execute(data: Request): Promise<Client> {
    const clientRepository = getCustomRepository(ClientRepository);
    const addressRepository = getRepository(Address);

    const {
      name,
      email,
      cpfCnpj,
      phone,
      birthday,
      acceptMarketing,
      address,
    } = data;

    const {
      cep,
      street,
      number,
      complement,
      district,
      city,
      state,
      principal,
    } = address[0];

    const checkDataUsed = await clientRepository.find({
      where: [{ email }, { cpfCnpj }],
    });

    if (checkDataUsed.length > 0) {
      throw new AppError('Email or CPF/CNPJ alredy used');
    }

    const client = clientRepository.create({
      name,
      email,
      cpfCnpj,
      phone,
      birthday,
      acceptMarketing,
    });

    const addressToSave = addressRepository.create({
      cep,
      street,
      number,
      complement,
      district,
      city,
      state,
      principal,
      client,
    });

    await addressRepository.save(addressToSave);

    return client;
  }
}

export default CreateClientService;
