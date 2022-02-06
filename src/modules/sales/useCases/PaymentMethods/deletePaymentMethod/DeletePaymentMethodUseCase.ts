import { inject, injectable } from 'tsyringe';

import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeletePaymentMethodUseCase {
  constructor(
    @inject('PaymentMethodsRepository')
    private PaymentMethodsRepository: IPaymentMethodsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const checkIfMethodExists =
      await this.PaymentMethodsRepository.findMethodByID(id);

    if (!checkIfMethodExists) {
      throw new AppError('Payment method does not found.', 404);
    }

    await this.PaymentMethodsRepository.deletePaymentMethod(id);
  }
}

export { DeletePaymentMethodUseCase };
