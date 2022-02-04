import { inject, injectable } from 'tsyringe';

import { IShippingMethodtsDTO } from '@modules/sales/dtos/IShippingMethosDTO';
import { ShippingMethod } from '@modules/sales/infra/typeorm/entities/ShippingMethod';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateShippingMethodUseCase {
  constructor(
    @inject('ShippingMethodsRepository')
    private ShippingMethodsRepository: IShippingMethodsRepository,
  ) {}

  async execute({
    name,
    description,
  }: IShippingMethodtsDTO): Promise<ShippingMethod> {
    const checkIfMethodExists =
      await this.ShippingMethodsRepository.findShippingMethodByName(name);

    if (checkIfMethodExists) {
      throw new AppError('This shipping method name already exists.');
    }

    const method = await this.ShippingMethodsRepository.createShippingMethod({
      name,
      description,
    });

    return method;
  }
}

export { CreateShippingMethodUseCase };
