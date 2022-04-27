import { getRepository, Repository } from 'typeorm';

import { ISupplierDTO } from '@modules/purchases/dtos/ISupplierDTO';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';

import { Supplier } from '../entities/Supplier';

class SuppliersRepository implements ISuppliersRepository {
  private repository: Repository<Supplier>;

  constructor() {
    this.repository = getRepository(Supplier);
  }

  async createSupplier({
    name,
    email,
    phone,
    taxCode,
  }: ISupplierDTO): Promise<Supplier> {
    const supplier = this.repository.create({
      name,
      email,
      phone,
      taxCode,
    });

    await this.repository.save(supplier);

    return supplier;
  }

  async updateSupplier({
    id,
    name,
    email,
    phone,
    taxCode,
  }: ISupplierDTO): Promise<void> {
    await this.repository.update(id, { name, email, phone, taxCode });
  }

  async listAllSuppliers(): Promise<Supplier[]> {
    const allSuppliers = await this.repository.find();

    return allSuppliers;
  }

  async getSupplierById(id: string): Promise<Supplier> {
    const supplier = await this.repository.findOne(id);

    return supplier;
  }

  async getSupplierByTaxCode(taxCode: string): Promise<Supplier> {
    const supplier = await this.repository.findOne({ where: { taxCode } });

    return supplier;
  }
}

export { SuppliersRepository };
