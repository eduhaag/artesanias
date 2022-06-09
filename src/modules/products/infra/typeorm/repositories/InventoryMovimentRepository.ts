import { getRepository, Repository } from 'typeorm';

import { IInventoryMovimentDTO } from '@modules/products/dtos/IIventoryMovimentDTO';
import { IInventoryRepository } from '@modules/products/repositories/IInventoryRepository';

import { InventoryMoviment } from '../entities/InventoryMoviment';

class InventoryMovimentRepository implements IInventoryRepository {
  private repository: Repository<InventoryMoviment>;

  constructor() {
    this.repository = getRepository(InventoryMoviment);
  }
  async getMovimentById(id: number): Promise<InventoryMoviment> {
    const moviment = await this.repository.findOne(id);

    return moviment;
  }

  async deleteMovimentInventory(movimentIds: number): Promise<void> {
    await this.repository.delete(movimentIds);
  }

  async removeMovimentByIds(ids: number[]): Promise<void> {
    await this.repository.delete(ids);
  }

  async createInventoryMoviment(
    moviments: IInventoryMovimentDTO[],
  ): Promise<void> {
    const movimentsToSave = this.repository.create(moviments);

    await this.repository.save(movimentsToSave);
  }

  async updateInvetoryMoviment({
    coast,
    materialId,
    quantity,
    type,
    history,
    id,
    purchaseId,
    saleId,
  }: IInventoryMovimentDTO): Promise<void> {
    await this.repository.update(id, {
      coast,
      materialId,
      quantity,
      type,
      history,
      purchaseId,
      saleId,
    });
  }

  async getInventoryBySale(saleId: number): Promise<InventoryMoviment[]> {
    const moviments = await this.repository.find({ where: { saleId } });

    return moviments;
  }

  async getMovimentsByPurchase(
    purchaseId: string,
  ): Promise<InventoryMoviment[]> {
    const moviments = await this.repository.find({ where: { purchaseId } });

    return moviments;
  }
}

export { InventoryMovimentRepository };
