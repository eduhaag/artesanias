import { inject, injectable } from 'tsyringe';

import { ISupplierDTO } from '@modules/purchases/dtos/ISupplierDTO';
import { ISuppliersRepository } from '@modules/purchases/repositories/ISuppliersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateSupplierUseCase {
  constructor(
    @inject('SuppliersRepository')
    private SuppliersRepository: ISuppliersRepository,
  ) {}

  async execute({
    id,
    name,
    email,
    phone,
    taxCode,
  }: ISupplierDTO): Promise<void> {
    const checkSupplierExists = await this.SuppliersRepository.getSupplierById(
      id,
    );

    if (!checkSupplierExists) {
      throw new AppError('Supplier does not found', 404);
    }

    if (taxCode && taxCode !== checkSupplierExists.taxCode) {
      const checkTaxCodeExists =
        await this.SuppliersRepository.getSupplierByTaxCode(taxCode);

      if (checkTaxCodeExists) {
        throw new AppError('Tax code already used.', 400);
      }
    }

    await this.SuppliersRepository.updateSupplier({
      id,
      name,
      email,
      phone,
      taxCode,
    });
  }
}

export { UpdateSupplierUseCase };
