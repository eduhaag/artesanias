import { inject, injectable } from 'tsyringe';

import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteBankAccountUseCase {
  constructor(
    @inject('BankAccountsRepository')
    private BankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const accountInDb = await this.BankAccountsRepository.getBankAccountById(
      id,
    );

    if (!accountInDb) {
      throw new AppError('Bank Account does not found', 404);
    }

    if (accountInDb.isFixed) {
      throw new AppError('This bank account can not be deleted.');
    }

    /*
      ---Criar regra para verificar saldo disponivel, somente permitir exclusão
         da conta com saldo zerado
    */

    await this.BankAccountsRepository.deleteBankAccount(id);
  }
}

export { DeleteBankAccountUseCase };
