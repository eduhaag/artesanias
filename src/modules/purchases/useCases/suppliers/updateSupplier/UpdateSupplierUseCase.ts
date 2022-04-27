import { inject, injectable } from 'tsyringe';

import { ISupplierDTO } from '@modules/purchases/dtos/ISupplierDTO';
import { Supplier } from '@modules/purchases/infra/typeorm/entities/Supplier';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSupplierUseCase {
  constructor(
    @inject('SuppliersRepository')
    private SuppliersRepository: ISuppliersRepository,
  ) {}

  async execute({
    name,
    email,
    phone,
    taxCode,
  }: ISupplierDTO): Promise<Supplier> {
    if (taxCode) {
      const checkTaxCodeExists =
        await this.SuppliersRepository.getSupplierByTaxCode(taxCode);

      if (checkTaxCodeExists) {
        throw new AppError('Tax code already used.', 400);
      }
    }

    const supplier = await this.SuppliersRepository.createSupplier({
      name,
      email,
      phone,
      taxCode,
    });

    return supplier;
  }
}

export { CreateSupplierUseCase };
