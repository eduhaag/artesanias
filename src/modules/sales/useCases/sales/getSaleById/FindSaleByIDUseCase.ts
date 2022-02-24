import { inject, injectable } from 'tsyringe';

import { Sale } from '@modules/sales/infra/typeorm/entities/Sale';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';

@injectable()
class FindSaleByIdUseCase {
  constructor(
    @inject('SalesRepository')
    private SalesRepository: ISalesRepository,
  ) {}

  async execute(id: number): Promise<Sale> {
    const sale = await this.SalesRepository.getSaleById(id);

    return sale;
  }
}

export { FindSaleByIdUseCase };
