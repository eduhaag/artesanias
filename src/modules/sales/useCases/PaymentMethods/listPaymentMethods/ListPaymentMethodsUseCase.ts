import { inject, injectable } from 'tsyringe';

import { PaymentMethod } from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';

@injectable()
class ListPaymentMethodsUseCase {
  constructor(
    @inject('PaymentMethodsRepository')
    private PaymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  async execute(): Promise<PaymentMethod[]> {
    const methods = await this.PaymentMethodsRepository.listAllPaymentMethods();

    return methods;
  }
}

export { ListPaymentMethodsUseCase };
