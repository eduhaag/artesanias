import { inject, injectable } from 'tsyringe';

import { IPurchaseProductsRepository } from '@modules/purchases/repositories/IPurchaseProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeletePurchaseProductUseCase {
  constructor(
    @inject('PurchaseProductsRepository')
    private PurchaseProductsRepository: IPurchaseProductsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const checkProductExists = await this.PurchaseProductsRepository.getById(
      id,
    );

    if (!checkProductExists) {
      throw new AppError('Purchased product does not found.', 404);
    }

    await this.PurchaseProductsRepository.deletePurchaseProduct(id);
  }
}

export { DeletePurchaseProductUseCase };
