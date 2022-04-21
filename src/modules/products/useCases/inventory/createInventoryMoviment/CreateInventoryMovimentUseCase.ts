import { inject, injectable } from 'tsyringe';

import { IInventoryMovimentDTO } from '@modules/products/dtos/IIventoryMovimentDTO';
import { IInventoryRepository } from '@modules/products/repositories/IInventoryRepository';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateInvetoryMovimentUseCase {
  constructor(
    @inject('InventoryRepository')
    private InventoryRepository: IInventoryRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async execute({
    materialId,
    quantity,
    history,
    type,
    coast,
    purchaseId,
    saleId,
  }: IInventoryMovimentDTO): Promise<void> {
    const checkMaterialExists = await this.productsRepository.findById(
      materialId,
    );

    if (!checkMaterialExists) {
      throw new AppError('Material does not found.', 404);
    }

    if (quantity <= 0) {
      throw new AppError('Quantity invalid.', 400);
    }

    if (purchaseId && saleId) {
      throw new AppError(
        'Movement cannot belong to a sale and a purchase at the same time.',
        400,
      );
    }

    await this.InventoryRepository.createInventoryMoviment([
      { materialId, coast, quantity, type, history, purchaseId, saleId },
    ]);
  }
}

export { CreateInvetoryMovimentUseCase };
