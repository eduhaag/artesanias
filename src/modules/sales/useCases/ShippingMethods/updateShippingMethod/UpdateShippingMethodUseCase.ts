import { inject, injectable } from 'tsyringe';

import { IShippingMethodtsDTO } from '@modules/sales/dtos/IShippingMethosDTO';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateShippingMethodUseCase {
  constructor(
    @inject('ShippingMethodsRepository')
    private ShippingMethodsRepository: IShippingMethodsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
  }: IShippingMethodtsDTO): Promise<void> {
    const methodInDB =
      await this.ShippingMethodsRepository.findShippingMethodByID(id);

    if (!methodInDB) {
      throw new AppError('Shipping method does not found.', 404);
    }

    if (methodInDB.name !== name) {
      const checkIfNameExists =
        await this.ShippingMethodsRepository.findShippingMethodByName(name);

      if (checkIfNameExists) {
        throw new AppError('This shipping method name already exists.');
      }
    }

    await this.ShippingMethodsRepository.updateShippingMethod({
      id,
      name,
      description,
    });
  }
}

export { UpdateShippingMethodUseCase };
