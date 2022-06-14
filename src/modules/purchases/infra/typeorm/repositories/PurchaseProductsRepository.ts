import { getRepository, Repository } from 'typeorm';

import { IPurchaseProductDTO } from '@modules/purchases/dtos/IPurchaseProductDTO';
import { IPurchaseProductsRepository } from '@modules/purchases/repositories/IPurchaseProductsRepository';

import { PurchaseProduct } from '../entities/PurchaseProduct';

class PurchaseProductsRepository implements IPurchaseProductsRepository {
  private repository: Repository<PurchaseProduct>;

  constructor() {
    this.repository = getRepository(PurchaseProduct);
  }

  async createPurchaseProduct({
    productId,
    purchaseId,
    price,
    quantity,
    reference,
  }: IPurchaseProductDTO): Promise<PurchaseProduct> {
    const product = this.repository.create({
      productId,
      purchaseId,
      price,
      quantity,
      reference,
    });

    await this.repository.save(product);

    return product;
  }

  async updatePurchaseProduct({
    id,
    price,
    quantity,
    reference,
  }: IPurchaseProductDTO): Promise<void> {
    await this.repository.update(id, { price, quantity, reference });
  }

  async deletePurchaseProduct(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async getById(id: number): Promise<PurchaseProduct> {
    const product = await this.repository.findOne(id);

    return product;
  }
}

export { PurchaseProductsRepository };
