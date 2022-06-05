import { inject, injectable } from 'tsyringe';

import { Ledger } from '@modules/financial/infra/typeorm/entities/Ledger';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class ListLedgersUseCase {
  constructor(
    @inject('LedgersRepository')
    private LedgersRepository: ILedgersRepository,
  ) {}

  async execute(type?: 1 | -1): Promise<Ledger[]> {
    if (type && type !== 1 && type !== -1) {
      throw new AppError('Type must be equal to 1 or -1 ');
    }
    const ledgers = await this.LedgersRepository.listLedgers(type);

    return ledgers;
  }
}

export { ListLedgersUseCase };
