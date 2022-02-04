import { inject, injectable } from 'tsyringe';

import { ShippingMethod } from '@modules/sales/infra/typeorm/entities/ShippingMethod';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';

@injectable()
class ListAllShippingMethodsUseCase {
  constructor(
    @inject('ShippingMethodsRepository')
    private ShippingMethodsRepository: IShippingMethodsRepository,
  ) {}

  async execute(): Promise<ShippingMethod[]> {
    const methods =
      await this.ShippingMethodsRepository.listAllShippingMethods();

    return methods;
  }
}

export { ListAllShippingMethodsUseCase };
