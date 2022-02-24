import { getRepository, Repository } from 'typeorm';

import { ISalesHistoryRepository } from '@modules/sales/repositories/ISalesHistoryRepository';

import { SaleHistory } from '../entities/SaleHistory';

class SalesHistoryRepository implements ISalesHistoryRepository {
  private repository: Repository<SaleHistory>;

  constructor() {
    this.repository = getRepository(SaleHistory);
  }

  async createHistory(saleId: number, history: string): Promise<void> {
    const newHistory = this.repository.create({ saleId, history });

    await this.repository.save(newHistory);
  }
}

export { SalesHistoryRepository };
