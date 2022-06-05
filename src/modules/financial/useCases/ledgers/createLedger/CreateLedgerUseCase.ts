import { inject, injectable } from 'tsyringe';

import { ILedgerDTO } from '@modules/financial/dtos/ILedgerDTO';
import { Ledger } from '@modules/financial/infra/typeorm/entities/Ledger';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateLedgerUseCase {
  constructor(
    @inject('LedgersRepository')
    private LedgersRepository: ILedgersRepository,
  ) {}

  async execute({ type, description, groupId }: ILedgerDTO): Promise<Ledger> {
    const checkLedgerNotExists = await this.LedgersRepository.findByDescription(
      description,
    );

    if (checkLedgerNotExists) {
      throw new AppError('Ledger description already exists.');
    }

    if (type !== 1 && type !== -1) {
      throw new AppError('Type must be equal to 1 or -1 ');
    }

    const ledger = await this.LedgersRepository.createLedger({
      type,
      description,
      groupId,
    });

    return ledger;
  }
}

export { CreateLedgerUseCase };
