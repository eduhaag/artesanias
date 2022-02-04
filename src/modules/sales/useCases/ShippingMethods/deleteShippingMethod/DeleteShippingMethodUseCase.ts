import { inject, injectable } from 'tsyringe';

import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteShippingMethodUseCase {
  constructor(
    @inject('ShippingMethodsRepository')
    private ShippingMethodsRepository: IShippingMethodsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const checkIfMethodExists =
      await this.ShippingMethodsRepository.findShippingMethodByID(id);

    if (!checkIfMethodExists) {
      throw new AppError('Shipping method does not found', 404);
    }

    await this.ShippingMethodsRepository.deleteShippingMethod(id);
  }
}

export { DeleteShippingMethodUseCase };
