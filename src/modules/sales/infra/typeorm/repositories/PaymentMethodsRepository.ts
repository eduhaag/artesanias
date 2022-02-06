import { getRepository, Repository } from 'typeorm';

import { IPaymentMethodsDTO } from '../../../dtos/IPaymentMethodsDTO';
import { IPaymentMethodsRepository } from '../../../repositories/IPaymentMethodsRepository';
import { PaymentMethod } from '../entities/PaymentMethod';

class PaymentMethodsRepository implements IPaymentMethodsRepository {
  private repository: Repository<PaymentMethod>;

  constructor() {
    this.repository = getRepository(PaymentMethod);
  }

  async createPaymentMethod({
    name,
    description,
    destinationAccount,
    fixRate,
    variableRate,
    creditTime,
  }: IPaymentMethodsDTO): Promise<PaymentMethod> {
    const method = this.repository.create({
      name,
      description,
      destinationAccount,
      fixRate,
      variableRate,
      creditTime,
    });

    await this.repository.save(method);

    return method;
  }

  async updatePaymentMethod({
    id,
    name,
    description,
    destinationAccount,
    fixRate,
    variableRate,
    creditTime,
  }: IPaymentMethodsDTO): Promise<void> {
    await this.repository.update(id, {
      name,
      description,
      destinationAccount,
      fixRate,
      variableRate,
      creditTime,
    });
  }

  async deletePaymentMethod(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async listAllPaymentMethods(): Promise<PaymentMethod[]> {
    const methods = await this.repository.find();

    return methods;
  }

  async findMethodByID(id: number): Promise<PaymentMethod> {
    const method = await this.repository.findOne(id);

    return method;
  }

  async findMethodByName(name: string): Promise<PaymentMethod> {
    const method = await this.repository.findOne({ where: { name } });

    return method;
  }
}

export { PaymentMethodsRepository };
