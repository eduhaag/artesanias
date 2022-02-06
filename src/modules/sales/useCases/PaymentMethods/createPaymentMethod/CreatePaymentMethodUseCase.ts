import { inject, injectable } from 'tsyringe';

import { IBankAccountsRepository } from '@modules/financial/repositories/IBankAccountsRepository';
import { IPaymentMethodsDTO } from '@modules/sales/dtos/IPaymentMethodsDTO';
import { PaymentMethod } from '@modules/sales/infra/typeorm/entities/PaymentMethod';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreatePaymentMethodUseCase {
  constructor(
    @inject('PaymentMethodsRepository')
    private PaymentMethodsRepository: IPaymentMethodsRepository,

    @inject('BankAccountsRepository')
    private bankAccountsRepository: IBankAccountsRepository,
  ) {}

  async execute({
    name,
    description,
    destinationAccount,
    fixRate,
    variableRate,
    creditTime,
  }: IPaymentMethodsDTO): Promise<PaymentMethod> {
    const checkIfNameExists =
      await this.PaymentMethodsRepository.findMethodByName(name);

    if (checkIfNameExists) {
      throw new AppError('This method name already exists.');
    }

    const checkIfAccountExists =
      await this.bankAccountsRepository.getBankAccountById(destinationAccount);

    if (!checkIfAccountExists) {
      throw new AppError('The distination account does not found.', 404);
    }

    const method = await this.PaymentMethodsRepository.createPaymentMethod({
      name,
      destinationAccount,
      description,
      fixRate,
      variableRate,
      creditTime,
    });

    return method;
  }
}

export { CreatePaymentMethodUseCase };
