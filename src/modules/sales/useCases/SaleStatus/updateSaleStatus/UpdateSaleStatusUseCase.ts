import { inject, injectable } from 'tsyringe';

import { ISaleStatusDTO } from '@modules/sales/dtos/ISaleStatusDTO';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateSaleStatusUseCase {
  constructor(
    @inject('SaleStatusRepository')
    private SaleStatusRepository: ISaleStatusRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    color,
  }: ISaleStatusDTO): Promise<void> {
    const statusInDB = await this.SaleStatusRepository.findSaleStatusById(id);

    if (!statusInDB) {
      throw new AppError('Sale status does not found.', 404);
    }

    if (statusInDB.name !== name) {
      const checkIfNameExists =
        await this.SaleStatusRepository.findSaleStatusByName(name);

      if (checkIfNameExists) {
        throw new AppError('Status name already exists.');
      }
    }

    await this.SaleStatusRepository.updateSaleStatus({
      id,
      name,
      description,
      color,
    });
  }
}

export { UpdateSaleStatusUseCase };
