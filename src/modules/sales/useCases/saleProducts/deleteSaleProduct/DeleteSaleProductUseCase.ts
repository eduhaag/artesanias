import { container, inject, injectable } from 'tsyringe';

import { ISaleProductsRepository } from '@modules/sales/repositories/ISaleProductsRepository';
import { AppError } from '@shared/errors/AppError';
import { MovesStock } from '@utils/movesStock';

@injectable()
class DeleteSaleProductUseCase {
  constructor(
    @inject('SaleProductsRepository')
    private SaleProductsRepository: ISaleProductsRepository,
  ) {}

  async execute(saleProductId: number): Promise<void> {
    const saleProductToDelete = await this.SaleProductsRepository.findById(
      saleProductId,
    );

    if (!saleProductToDelete) {
      throw new AppError('Sale product does not found.', 404);
    }

    await this.SaleProductsRepository.deleteSaleProduct(saleProductId);

    const movesStock = container.resolve(MovesStock);

    await movesStock.removeStockMovimentBySaleProduct(
      saleProductToDelete.saleId,
      saleProductToDelete,
    );
  }
}

export { DeleteSaleProductUseCase };
