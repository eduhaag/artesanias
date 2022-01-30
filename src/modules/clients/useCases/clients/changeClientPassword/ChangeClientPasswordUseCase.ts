import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { IChangePasswordDTO } from '@modules/clients/dtos/IClientDTO';
import { IClientsRepository } from '@modules/clients/repositories/IClientsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ChangeClientPasswordUseCase {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  async execute({
    id,
    oldPassword,
    newPassword,
  }: IChangePasswordDTO): Promise<void> {
    const clientInDB = await this.clientsRepository.getClientById(id);

    if (!clientInDB) {
      throw new AppError('Client does not found.', 404);
    }

    if (clientInDB.hashedPassword) {
      const passwordCompare = await compare(
        oldPassword,
        clientInDB.hashedPassword,
      );

      if (!passwordCompare) {
        throw new AppError('Password does not match.', 401);
      }
    }

    const hashedPassword = await hash(newPassword, 8);

    await this.clientsRepository.changeClientPassword(id, hashedPassword);
  }
}

export { ChangeClientPasswordUseCase };
