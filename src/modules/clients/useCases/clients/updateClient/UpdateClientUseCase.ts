import { inject, injectable } from 'tsyringe';

import { IClientDTO } from '@modules/clients/dtos/IClientDTO';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateClientUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({
    id,
    name,
    acceptMarketing,
    phone,
    email,
    taxCode,
    birthday,
  }: IClientDTO): Promise<void> {
    const clientOnDB = await this.clientsRepository.getClientById(id);

    if (!clientOnDB) {
      throw new AppError('Client does not found.', 404);
    }

    if (clientOnDB.taxCode !== taxCode) {
      const checkIfTaxCodeExists =
        await this.clientsRepository.getClientByTaxCode(taxCode);

      if (checkIfTaxCodeExists) {
        throw new AppError('Tax code already exists.');
      }
    }

    await this.clientsRepository.updateClient({
      id,
      name,
      acceptMarketing,
      birthday,
      taxCode,
      email,
      phone,
    });
  }
}

export { UpdateClientUseCase };
