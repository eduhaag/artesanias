import { inject, injectable } from 'tsyringe';

import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { IPaymentMethodsDTO } from '@modules/sales/dtos/IPaymentMethodsDTO';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdatePaymentMethodUseCase {
  constructor(
    @inject('PaymentMethodsRepository')
    private PaymentMethodsRepository: IPaymentMethodsRepository,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute({
    id,
    name,
    description,
    destinationAccount,
    fixRate,
    variableRate,
    creditTime,
  }: IPaymentMethodsDTO): Promise<void> {
    const methodInDb = await this.PaymentMethodsRepository.findMethodByID(id);

    if (!methodInDb) {
      throw new AppError('Payment method does not found', 404);
    }

    if (methodInDb.name !== name) {
      const checkIfNameExists =
        await this.PaymentMethodsRepository.findMethodByName(name);

      if (checkIfNameExists) {
        throw new AppError('This method name already exists.');
      }
    }

    if (methodInDb.destinationAccount !== destinationAccount) {
      const checkIfAccountExists =
        await this.bankAccountsRepository.getBankAccountById(
          destinationAccount,
        );

      if (!checkIfAccountExists) {
        throw new AppError('Destination account does not found.', 404);
      }
    }

    await this.PaymentMethodsRepository.updatePaymentMethod({
      id,
      name,
      destinationAccount,
      description,
      fixRate,
      variableRate,
      creditTime,
    });
  }
}

export { UpdatePaymentMethodUseCase };
