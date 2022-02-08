import { inject, injectable } from 'tsyringe';

import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteSaleStatusUseCase {
  constructor(
    @inject('SaleStatusRepository')
    private SaleStatusRepository: ISaleStatusRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const statusInDB = await this.SaleStatusRepository.findSaleStatusById(id);

    if (!statusInDB) {
      throw new AppError('Sale status does not found.', 404);
    }

    if (statusInDB.isFixed) {
      throw new AppError('This sale status is fixed.');
    }

    await this.SaleStatusRepository.deleteSaleStatus(id);
  }
}

export { DeleteSaleStatusUseCase };
