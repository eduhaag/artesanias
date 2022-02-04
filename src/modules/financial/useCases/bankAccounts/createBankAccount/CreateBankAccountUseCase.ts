import { inject, injectable } from 'tsyringe';

import { IBankAccountDTO } from '@modules/financial/dtos/IBankAccountDTO';
import { BankAccount } from '@modules/financial/infra/typeorm/entities/BankAccount';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateBankAccountUseCase {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute({
    name,
    startingBalance,
  }: IBankAccountDTO): Promise<BankAccount> {
    const checkAccountNameExists =
      await this.bankAccountsRepository.getBankAccountByName(name);

    if (checkAccountNameExists) {
      throw new AppError('Account name already exists');
    }

    const account = await this.bankAccountsRepository.createBankAccount({
      name,
      startingBalance,
    });

    return account;
  }
}

export { CreateBankAccountUseCase };
