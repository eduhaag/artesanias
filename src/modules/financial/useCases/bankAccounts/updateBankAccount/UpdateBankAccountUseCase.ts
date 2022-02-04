import { inject, injectable } from 'tsyringe';

import { IBankAccountDTO } from '@modules/financial/dtos/IBankAccountDTO';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateBankAccountUseCase {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute({ id, name, startingBalance }: IBankAccountDTO): Promise<void> {
    const accountInDB = await this.bankAccountsRepository.getBankAccountById(
      id,
    );

    if (!accountInDB) {
      throw new AppError('Bank account does not found', 404);
    }

    if (accountInDB.name !== name) {
      const checkIfNameDoesNotExists =
        await this.bankAccountsRepository.getBankAccountByName(name);

      if (checkIfNameDoesNotExists) {
        throw new AppError('Account name already exists.');
      }
    }

    await this.bankAccountsRepository.updateBankAccount({
      id,
      name,
      startingBalance,
    });
  }
}

export { UpdateBankAccountUseCase };
