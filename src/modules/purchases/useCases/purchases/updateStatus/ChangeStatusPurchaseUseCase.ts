/* eslint-disable no-restricted-syntax */
import { container, inject, injectable } from 'tsyringe';

import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';
import { AppError } from '@shared/errors/AppError';
import { MovesStock } from '@utils/movesStock';

@injectable()
class ChangeStatusPurchaseUseCase {
  constructor(
    @inject('PurchasesRepository')
    private PurchasesRepository: IPurchasesRepository,
  ) {}

  async execute(id: string, status: string): Promise<void> {
    const checkPurchaseExists = await this.PurchasesRepository.getById(id);

    if (!checkPurchaseExists) {
      throw new AppError('Purchase does not found.', 404);
    }

    await this.PurchasesRepository.updateStatus(id, status);

    const movesStock = container.resolve(MovesStock);

    // eslint-disable-next-line default-case
    switch (status) {
      case 'Finalizado':
        await movesStock.addStockMovimentByPurchase(
          checkPurchaseExists.products,
        );
        break;
      case 'Cancelado':
        await movesStock.removeStockMovimentByPurchase(id);
        break;
    }
  }
}

export { ChangeStatusPurchaseUseCase };
