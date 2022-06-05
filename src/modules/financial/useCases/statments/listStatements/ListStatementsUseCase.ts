/* eslint-disable no-param-reassign */
import { inject, injectable } from 'tsyringe';

import { IStatementsFilterDTO } from '@modules/financial/dtos/IStatmentsDTO';
import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';
import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProveider';

@injectable()
class ListStatementsUseCase {
  constructor(
    @inject('StatementsRepository')
    private StatementsRepository: IStatementsRepository,

    @inject('DateProvider')
    private DateProvider: IDateProvider,
  ) {}

  async execute({
    bankAccount,
    description,
    fulfilledOn,
    ledger,
    toFulfilled,
  }: IStatementsFilterDTO): Promise<Statement[]> {
    if (fulfilledOn) {
      fulfilledOn.to = this.DateProvider.setDatetoEndOfDay(
        fulfilledOn.to.toString(),
      );
    }

    if (toFulfilled) {
      toFulfilled.to = this.DateProvider.setDatetoEndOfDay(
        toFulfilled.to.toString(),
      );
    }

    const statements = await this.StatementsRepository.listStatments({
      bankAccount,
      description,
      fulfilledOn,
      ledger,
      toFulfilled,
    });

    return statements;
  }
}

export { ListStatementsUseCase };
