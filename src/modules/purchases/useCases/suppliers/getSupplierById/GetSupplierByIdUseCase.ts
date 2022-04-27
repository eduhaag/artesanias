import { inject, injectable } from 'tsyringe';

import { Supplier } from '@modules/purchases/infra/typeorm/entities/Supplier';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';

@injectable()
class GetSupplierByIdUseCase {
  constructor(
    @inject('SuppliersRepository')
    private SuppliersRepository: ISuppliersRepository,
  ) {}

  async execute(id: string): Promise<Supplier> {
    const supplier = await this.SuppliersRepository.getSupplierById(id);

    return supplier;
  }
}

export { GetSupplierByIdUseCase };
