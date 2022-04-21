import { inject, injectable } from 'tsyringe';

import { IInventoryRepository } from '@modules/products/repositories/IInventoryRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteInventoryMovimentUseCase {
  constructor(
    @inject('InventoryRepository')
    private InventoryRepository: IInventoryRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const checkMovimentExists = await this.InventoryRepository.getMovimentById(
      id,
    );

    if (!checkMovimentExists) {
      throw new AppError('Inventory moviment does not found', 404);
    }

    await this.InventoryRepository.deleteMovimentInventory(id);
  }
}

export { DeleteInventoryMovimentUseCase };
