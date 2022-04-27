import { inject, injectable } from 'tsyringe';

import { Supplier } from '@modules/purchases/infra/typeorm/entities/Supplier';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';

@injectable()
class ListAllSuppliersUseCase {
  constructor(
    @inject('SuppliersRepository')
    private SuppliersRepository: ISuppliersRepository,
  ) {}

  async execute(): Promise<Supplier[]> {
    const suppliers = await this.SuppliersRepository.listAllSuppliers();

    return suppliers;
  }
}

export { ListAllSuppliersUseCase };
