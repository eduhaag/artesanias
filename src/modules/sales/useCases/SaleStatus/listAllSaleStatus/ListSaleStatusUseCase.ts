import { inject, injectable } from 'tsyringe';

import { SaleStatus } from '@modules/sales/infra/typeorm/entities/SaleStatus';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';

@injectable()
class ListSaleStatusUseCase {
  constructor(
    @inject('SaleStatusRepository')
    private SaleStatusRepository: ISaleStatusRepository,
  ) {}

  async execute(): Promise<SaleStatus[]> {
    const list = await this.SaleStatusRepository.listSaleStatus();

    return list;
  }
}

export { ListSaleStatusUseCase };
