import { inject, injectable } from 'tsyringe';

import { IAddressRepository } from '@modules/clients/repositories/IAddressRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const checkIfAddressExists = await this.addressRepository.getAddressById(
      id,
    );

    if (!checkIfAddressExists) {
      throw new AppError('Address does not found.', 404);
    }

    await this.addressRepository.deleteAddress(id);
  }
}

export { DeleteAddressUseCase };
