import { inject, injectable } from 'tsyringe';

import { IStatmentsDTO } from '@modules/financial/dtos/IStatmentsDTO';
import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateStatementUseCase {
  constructor(
    @inject('StatementsRepository')
    private StatementsRepository: IStatementsRepository,

    @inject('LedgersRepository')
    private LedgersRepository: ILedgersRepository,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,

    @inject('SalesRepository')
    private SalesRepository: ISalesRepository,
  ) {}

  async execute({
    bankAccountId,
    ledgerId,
    toFulfilled,
    fulfilledOn,
    description,
    value,
    purchaseId,
    saleId,
  }: IStatmentsDTO): Promise<Statement> {
    const checkIfLedgerExists = await this.LedgersRepository.findById(ledgerId);
    if (!checkIfLedgerExists) {
      throw new AppError('Ledger does not found', 404);
    }

    const checkIfBankAccountExists =
      await this.bankAccountsRepository.getBankAccountById(bankAccountId);
    if (!checkIfBankAccountExists) {
      throw new AppError('Bank Account does not found.', 404);
    }

    if (saleId) {
      const checkIfSaleExists = await this.SalesRepository.getSaleById(saleId);

      if (!checkIfSaleExists) {
        throw new AppError('Sale does not found.', 404);
      }
    }

    if (purchaseId) {
      // escrever consulta a compra
    }

    if (!value || value === 0) {
      throw new AppError('Value is not valid.');
    }

    // Caso o tipo da categoria seja de saida, faz com que o valor fique negativo
    const valuecorrect = value * checkIfLedgerExists.type;

    const statement = await this.StatementsRepository.createStatement({
      toFulfilled,
      fulfilledOn,
      ledgerId,
      bankAccountId,
      description,
      value: valuecorrect,
      purchaseId,
      saleId,
    });

    return statement;
  }
}

export { CreateStatementUseCase };
