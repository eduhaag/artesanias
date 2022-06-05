import { getRepository, Repository } from 'typeorm';

import {
  IStatmentsDTO,
  IStatementsFilterDTO,
} from '@modules/financial/dtos/IStatmentsDTO';
import { IStatementsRepository } from '@modules/financial/repositories/IStatementsRepository';

import { Statement } from '../entities/Statement';

class StatementsRepository implements IStatementsRepository {
  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async createStatement({
    toFulfilled,
    fulfilledOn,
    bankAccountId,
    ledgerId,
    description,
    purchaseId,
    saleId,
    value,
  }: IStatmentsDTO): Promise<Statement> {
    const statment = this.repository.create({
      toFulfilled,
      fulfilledOn,
      bankAccountId,
      ledgerId,
      description,
      purchaseId,
      saleId,
      value,
    });

    await this.repository.save(statment);

    return statment;
  }

  async updateStatement(statments: Statement[]): Promise<void> {
    await this.repository.save(statments);
  }

  async deleteStatments(id: string[]): Promise<void> {
    await this.repository.delete(id);
  }

  async listStatments({
    bankAccount,
    description,
    ledger,
    fulfilledOn,
    toFulfilled,
  }: IStatementsFilterDTO): Promise<Statement[]> {
    console.log(fulfilledOn);
    const statmentsQuery = this.repository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.ledger', 'ledger')
      .leftJoinAndSelect('s.bankAccount', 'bankAccount');

    if (bankAccount) {
      statmentsQuery.andWhere('s.bankAccountId IN(:...accountIds)', {
        accountIds: bankAccount,
      });
    }

    if (ledger) {
      statmentsQuery.andWhere('s.ledgerId IN(:...ledgerIds)', {
        ledgerIds: ledger,
      });
    }

    if (description) {
      statmentsQuery.andWhere('LOWER(s.description) like LOWER(:description)', {
        description: `%${description}%`,
      });
    }

    if (fulfilledOn) {
      statmentsQuery.andWhere('s.fulfilledOn BETWEEN :init AND :end', {
        init: fulfilledOn.from,
        end: fulfilledOn.to,
      });
    }

    if (toFulfilled) {
      statmentsQuery.andWhere('s.to_fulfilled BETWEEN :from AND :to', {
        from: toFulfilled.from,
        to: toFulfilled.to,
      });
    }

    console.log(statmentsQuery.getSql(), statmentsQuery.getParameters());
    const statements = statmentsQuery.getMany();

    return statements;
  }

  async findById(id: string): Promise<Statement> {
    const statment = await this.repository.findOne(id);

    return statment;
  }

  async lauchStatments(ids: string[], lauchDate: Date | null): Promise<void> {
    await this.repository.update(ids, { fulfilledOn: lauchDate });
  }
}

export { StatementsRepository };
