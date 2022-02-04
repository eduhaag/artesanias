import { getRepository, Repository } from 'typeorm';

import { IShippingMethodtsDTO } from '@modules/sales/dtos/IShippingMethosDTO';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';

import { ShippingMethod } from '../entities/ShippingMethod';

class ShippingMethodsRepository implements IShippingMethodsRepository {
  private repository: Repository<ShippingMethod>;

  constructor() {
    this.repository = getRepository(ShippingMethod);
  }

  async createShippingMethod({
    name,
    description,
  }: IShippingMethodtsDTO): Promise<ShippingMethod> {
    const method = this.repository.create({ name, description });

    await this.repository.save(method);

    return method;
  }

  async updateShippingMethod({
    id,
    name,
    description,
  }: IShippingMethodtsDTO): Promise<void> {
    await this.repository.update(id, { name, description });
  }

  async deleteShippingMethod(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async listAllShippingMethods(): Promise<ShippingMethod[]> {
    const methods = await this.repository.find();

    return methods;
  }

  async findShippingMethodByID(id: number): Promise<ShippingMethod> {
    const method = await this.repository.findOne(id);

    return method;
  }

  async findShippingMethodByName(name: string): Promise<ShippingMethod> {
    const method = await this.repository.findOne({ where: { name } });

    return method;
  }
}

export { ShippingMethodsRepository };
