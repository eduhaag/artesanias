import { inject, injectable } from 'tsyringe';

import { IPurchaseProductDTO } from '@modules/purchases/dtos/IPurchaseProductDTO';
import { IPurchaseProductsRepository } from '@modules/purchases/repositories/IPurchaseProductsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdatePurchaseProductUseCase {
  constructor(
    @inject('PurchaseProductsRepository')
    private PurchaseProductsRepository: IPurchaseProductsRepository,
  ) {}

  async execute({
    id,
    quantity,
    price,
    reference,
  }: IPurchaseProductDTO): Promise<void> {
    const checkProductExists = await this.PurchaseProductsRepository.getById(
      id,
    );

    if (!checkProductExists) {
      throw new AppError('Purchased product does not found.', 404);
    }

    await this.PurchaseProductsRepository.updatePurchaseProduct({
      id,
      quantity,
      price,
      reference,
    });
  }
}

export { UpdatePurchaseProductUseCase };
