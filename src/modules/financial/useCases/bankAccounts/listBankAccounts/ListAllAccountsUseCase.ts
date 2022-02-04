import { inject, injectable } from 'tsyringe';

import { BankAccount } from '@modules/financial/infra/typeorm/entities/BankAccount';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';

@injectable()
class ListAllAccountsUseCase {
  constructor(
    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute(): Promise<BankAccount[]> {
    const allAccounts = await this.bankAccountsRepository.listAllBankAccounts();

    return allAccounts;
  }
}

export { ListAllAccountsUseCase };
