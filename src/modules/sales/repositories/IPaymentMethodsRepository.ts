import { IPaymentMethodsDTO } from '../dtos/IPaymentMethodsDTO';
import { PaymentMethod } from '../infra/typeorm/entities/PaymentMethod';

interface IPaymentMethodsRepository {
  createPaymentMethod({
    name,
    description,
    destinationAccount,
    fixRate,
    variableRate,
    creditTime,
  }: IPaymentMethodsDTO): Promise<PaymentMethod>;
  updatePaymentMethod({
    id,
    name,
    description,
    destinationAccount,
    fixRate,
    variableRate,
    creditTime,
  }: IPaymentMethodsDTO): Promise<void>;
  deletePaymentMethod(id: number): Promise<void>;
  listAllPaymentMethods(): Promise<PaymentMethod[]>;
  findMethodByID(id: number): Promise<PaymentMethod>;
  findMethodByName(name: string): Promise<PaymentMethod>;
}

export { IPaymentMethodsRepository };
