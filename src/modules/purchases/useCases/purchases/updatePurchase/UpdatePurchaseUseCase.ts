import { inject, injectable } from 'tsyringe';

import { IPurchaseDTO } from '@modules/purchases/dtos/IPurchaseDTO';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdatePurchaseUseCase {
  constructor(
    @inject('PurchasesRepository')
    private PurchasesRepository: IPurchasesRepository,
  ) {}

  async execute({
    id,
    addition,
    discount,
    invoice,
    observations,
    shippingCoast,
    installments,
  }: IPurchaseDTO): Promise<void> {
    const checkPurchaseExists = await this.PurchasesRepository.getById(id);

    if (!checkPurchaseExists) {
      throw new AppError('Purchase does not found', 404);
    }

    if (
      checkPurchaseExists.status === 'Finalizado' ||
      checkPurchaseExists.status === 'Cancelado'
    ) {
      throw new AppError('Is not possible modify this purchase.');
    }

    await this.PurchasesRepository.updatePurchase({
      id,
      invoice,
      addition,
      discount,
      observations,
      shippingCoast,
      installments,
    });
  }
}

export { UpdatePurchaseUseCase };
