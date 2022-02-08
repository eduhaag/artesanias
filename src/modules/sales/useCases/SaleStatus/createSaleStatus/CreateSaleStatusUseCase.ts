import { inject, injectable } from 'tsyringe';

import { ISaleStatusDTO } from '@modules/sales/dtos/ISaleStatusDTO';
import { SaleStatus } from '@modules/sales/infra/typeorm/entities/SaleStatus';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSaleStatusUseCase {
  constructor(
    @inject('SaleStatusRepository')
    private SaleStatusRepository: ISaleStatusRepository,
  ) {}

  async execute({
    name,
    description,
    color,
  }: ISaleStatusDTO): Promise<SaleStatus> {
    const checkIfNameExists =
      await this.SaleStatusRepository.findSaleStatusByName(name);

    if (checkIfNameExists) {
      throw new AppError('This status name already exists.');
    }

    const status = await this.SaleStatusRepository.createSaleStatus({
      name,
      description,
      color,
    });

    return status;
  }
}

export { CreateSaleStatusUseCase };
