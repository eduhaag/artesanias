import { inject, injectable } from 'tsyringe';

import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteLedgerUseCase {
  constructor(
    @inject('LedgersRepository')
    private LedgersRepository: ILedgersRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const checkIfLedgerExists = await this.LedgersRepository.findById(id);

    if (!checkIfLedgerExists) {
      throw new AppError('Ledger does not found', 404);
    }

    if (checkIfLedgerExists.isFixed) {
      throw new AppError('This ledger does not be deleted', 403);
    }

    await this.LedgersRepository.deleteLedger(id);
  }
}

export { DeleteLedgerUseCase };
