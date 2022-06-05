import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListStatementsUseCase } from './ListStatementsUseCase';

class ListStatementsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { query } = req;

    const { description, fulfilledOn, toFulfilled } = query;
    let bankAccountNumber;
    let ledgersNumber;

    if (query.bankAccount) {
      const bankAccount = query.bankAccount as string;
      bankAccountNumber = bankAccount.split(',').map(account => {
        return parseInt(account, 10);
      });
    }

    if (query.ledger) {
      const ledgers = query.ledger as string;
      ledgersNumber = ledgers.split(',').map(ledger => {
        return parseInt(ledger, 10);
      });
    }

    const listStatementsUseCase = container.resolve(ListStatementsUseCase);

    const statements = await listStatementsUseCase.execute({
      description: description as string,
      bankAccount: bankAccountNumber,
      ledger: ledgersNumber,
      fulfilledOn: fulfilledOn ? JSON.parse(fulfilledOn as string) : undefined,
      toFulfilled: toFulfilled ? JSON.parse(toFulfilled as string) : undefined,
    });

    return res.json(statements);
  }
}

export { ListStatementsController };
