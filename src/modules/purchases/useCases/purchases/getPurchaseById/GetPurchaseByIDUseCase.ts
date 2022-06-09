import { inject, injectable } from 'tsyringe';

import { Purchase } from '@modules/purchases/infra/typeorm/entities/Purchase';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';

@injectable()
class GetPurchaseByIDUseCase {
  constructor(
    @inject('PurchasesRepository')
    private PurchasesRepository: IPurchasesRepository,
  ) {}

  async execute(id: string): Promise<Purchase> {
    const purchase = await this.PurchasesRepository.getById(id);

    return purchase;
  }
}

export { GetPurchaseByIDUseCase };
