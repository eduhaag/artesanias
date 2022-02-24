import { inject, injectable } from 'tsyringe';

import { ISalesHistoryRepository } from '@modules/sales/repositories/ISalesHistoryRepository';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateSaleStatusUseCase {
  constructor(
    @inject('SalesRepository')
    private SalesRepository: ISalesRepository,

    @inject('SaleStatusRepository')
    private SaleStatusRepository: ISaleStatusRepository,

    @inject('SalesHistoryRepository')
    private SalesHistoryRepository: ISalesHistoryRepository,
  ) {}

  async execute(saleId: number, statusId: number): Promise<void> {
    const saleInDB = await this.SalesRepository.getSaleById(saleId);

    if (!saleInDB) {
      throw new AppError('Sale does not found', 404);
    }

    if (saleInDB.statusId === statusId) {
      throw new AppError('Order status not changed', 400);
    }

    const checkStatusExists =
      await this.SaleStatusRepository.findSaleStatusById(statusId);

    if (!checkStatusExists) {
      throw new AppError('Status does not found', 404);
    }

    await this.SalesHistoryRepository.createHistory(
      saleId,
      `Status do pedido atualizado para ${checkStatusExists.name}`,
    );

    await this.SalesRepository.updateSaleStatus(saleId, statusId);
  }
}

export { UpdateSaleStatusUseCase };
