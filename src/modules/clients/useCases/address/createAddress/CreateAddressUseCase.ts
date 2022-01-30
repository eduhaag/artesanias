import { inject, injectable } from 'tsyringe';

import { IAddressDTO } from '@modules/clients/dtos/IAddressDTO';
import { Address } from '@modules/clients/infra/typeorm/entities/Address';
import { IAddressRepository } from '@modules/clients/repositories/IAddressRepository';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({
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
    const checkIfClientExists = await this.clientsRepository.getClientById(
      clientId,
    );

    if (!checkIfClientExists) {
      throw new AppError('Client does not found', 404);
    }

    if (main) {
      const mainAddressOfClient =
        await this.addressRepository.getMainAddressByClient(clientId);

      if (mainAddressOfClient) {
        mainAddressOfClient.main = false;
        await this.addressRepository.updateAddress(mainAddressOfClient);
      }
    }

    const address = this.addressRepository.createAddress({
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

    return address;
  }
}

export { CreateAddressUseCase };
