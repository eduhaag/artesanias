import { inject, injectable } from 'tsyringe';

import { ILedgerDTO } from '@modules/financial/dtos/ILedgerDTO';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateLedgerUseCase {
  constructor(
    @inject('LedgersRepository')
    private LedgersRepository: ILedgersRepository,
  ) {}

  async execute({ id, type, description, groupId }: ILedgerDTO): Promise<void> {
    const checkLedgerExists = await this.LedgersRepository.findById(id);

    if (!checkLedgerExists) {
      throw new AppError('Ledger does not found.', 404);
    }

    if (checkLedgerExists.isFixed) {
      throw new AppError('This ledger does not be modified', 403);
    }

    if (checkLedgerExists.description !== description) {
      const checkIfDescriptionIsAvailable =
        await this.LedgersRepository.findByDescription(description);

      if (checkIfDescriptionIsAvailable) {
        throw new AppError('Ledger description already exists.');
      }
    }

    if (type !== 1 && type !== -1) {
      throw new AppError('Type must be equal to 1 or -1 ');
    }

    await this.LedgersRepository.updateLedger({
      id,
      description,
      type,
      groupId,
    });
  }
}

export { UpdateLedgerUseCase };
