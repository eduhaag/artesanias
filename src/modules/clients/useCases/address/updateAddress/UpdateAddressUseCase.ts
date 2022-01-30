import { inject, injectable } from 'tsyringe';

import { IAddressUpdateDTO } from '@modules/clients/dtos/IAddressDTO';
import { IAddressRepository } from '@modules/clients/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute({
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
  }: IAddressUpdateDTO): Promise<void> {
    const addressInDb = await this.addressRepository.getAddressById(id);

    if (!addressInDb || addressInDb.clientId !== clientId) {
      throw new AppError('Address does not found.', 404);
    }

    if (main) {
      const mainAddressOfClient =
        await this.addressRepository.getMainAddressByClient(
          addressInDb.clientId,
        );

      if (mainAddressOfClient) {
        mainAddressOfClient.main = false;
        await this.addressRepository.updateAddress(mainAddressOfClient);
      }
    }

    await this.addressRepository.updateAddress({
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
    });
  }
}

export { UpdateAddressUseCase };
