/* eslint-disable no-param-reassign */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';

import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';
import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';
import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';
import { AppError } from '@shared/errors/AppError';

interface IData {
  statements: Statement[];
  modifiers: {
    ledger?: number;
    bankAccount?: number;
    fulfilledOn?: Date;
    toFulfilled?: Date;
    value?: number;
  };
}

@injectable()
class UpdateStatementsUseCase {
  constructor(
    @inject('StatementsRepository')
    private StatementsRepository: IStatementsRepository,

    @inject('LedgersRepository')
    private LedgersRepository: ILedgersRepository,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute({ statements, modifiers }: IData): Promise<void> {
    const { bankAccount, fulfilledOn, ledger, toFulfilled, value } = modifiers;
    let ledgerType;

    if (bankAccount) {
      const checkIfBankAccountExists =
        await this.bankAccountsRepository.getBankAccountById(bankAccount);

      if (!checkIfBankAccountExists) {
        throw new AppError('Bank Account does not found.', 404);
      }
    }

    if (ledger) {
      const checkIfLedgerExists = await this.LedgersRepository.findById(ledger);

      if (!checkIfLedgerExists) {
        throw new AppError('Ledger does not found.', 404);
      }

      ledgerType = checkIfLedgerExists.type;
    }

    if (value && value === 0) {
      throw new AppError('Value is not valid');
    }

    const newStatements = statements.map(statement => {
      for (const key in modifiers) {
        // eslint-disable-next-line default-case
        switch (key) {
          case 'ledger':
            statement.ledgerId = ledger;
            statement.value *= ledgerType;
            break;
          case 'bankAccount':
            statement.bankAccountId = bankAccount;
            break;
          case 'value':
            if (ledger) {
              statement.value = value * ledgerType;
            } else {
              ledgerType = statement.value < 0 ? -1 : 1;
              statement.value = value * ledgerType;
            }

            break;
          case 'fulfilledOn':
            statement.fulfilledOn = fulfilledOn;
            break;
          case 'toFulfilled':
            statement.toFulfilled = toFulfilled;
        }
      }
      return statement;
    });

    this.StatementsRepository.updateStatement(newStatements);
  }
}

export { UpdateStatementsUseCase };
