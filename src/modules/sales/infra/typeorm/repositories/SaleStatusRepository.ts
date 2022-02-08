import { getRepository, Repository } from 'typeorm';

import { ISaleStatusDTO } from '@modules/sales/dtos/ISaleStatusDTO';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';

import { SaleStatus } from '../entities/SaleStatus';

class SaleStatusRepository implements ISaleStatusRepository {
  private repository: Repository<SaleStatus>;

  constructor() {
    this.repository = getRepository(SaleStatus);
  }

  async createSaleStatus({
    name,
    description,
    color,
  }: ISaleStatusDTO): Promise<SaleStatus> {
    const status = this.repository.create({ name, description, color });

    await this.repository.save(status);

    return status;
  }

  async updateSaleStatus({
    id,
    name,
    description,
    color,
  }: ISaleStatusDTO): Promise<void> {
    await this.repository.update(id, { name, description, color });
  }

  async deleteSaleStatus(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async listSaleStatus(): Promise<SaleStatus[]> {
    const status = await this.repository.find();

    return status;
  }

  async findSaleStatusById(id: number): Promise<SaleStatus> {
    const status = await this.repository.findOne(id);

    return status;
  }

  async findSaleStatusByName(name: string): Promise<SaleStatus> {
    const status = await this.repository.findOne({ where: { name } });

    return status;
  }
}

export { SaleStatusRepository };
