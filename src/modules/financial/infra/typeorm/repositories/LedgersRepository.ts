import { getRepository, Repository } from 'typeorm';

import { ILedgerDTO } from '@modules/financial/dtos/ILedgerDTO';
import { ILedgersRepository } from '@modules/financial/repositories/ILedgersRepository';

import { Ledger } from '../entities/Ledger';

class LedgersRepository implements ILedgersRepository {
  private repository: Repository<Ledger>;

  constructor() {
    this.repository = getRepository(Ledger);
  }

  async createLedger({
    type,
    description,
    groupId,
  }: ILedgerDTO): Promise<Ledger> {
    const ledger = this.repository.create({
      type,
      description,
      ledgerGroupId: groupId,
    });

    await this.repository.save(ledger);

    return ledger;
  }

  async updateLedger({
    id,
    type,
    description,
    groupId,
  }: ILedgerDTO): Promise<void> {
    await this.repository.update(id, {
      type,
      description,
      ledgerGroupId: groupId,
    });
  }

  async listLedgers(type?: 1 | -1): Promise<Ledger[]> {
    const ledgersQuery = this.repository.createQueryBuilder('p');

    if (type) {
      ledgersQuery.andWhere('p.type = :type', { type });
    }

    const ledgers = await ledgersQuery.getMany();

    return ledgers;
  }

  async deleteLedger(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findById(id: number): Promise<Ledger> {
    const ledger = await this.repository.findOne(id);

    return ledger;
  }

  async findByDescription(description: string): Promise<Ledger> {
    const ledger = await this.repository.findOne({ where: { description } });

    return ledger;
  }
}

export { LedgersRepository };
