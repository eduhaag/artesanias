import { IPurchaseDTO, IPurchaseFilterDTO } from '../dtos/IPurchaseDTO';
import { Purchase } from '../infra/typeorm/entities/Purchase';

interface IPurchasesRepository {
  createPurchase({
    supplier,
    status,
    invoice,
    installments,
    observations,
    discount,
    addition,
    products,
    shippingCoast,
    statements,
  }: IPurchaseDTO): Promise<Purchase>;
  updatePurchase({
    id,
    addition,
    discount,
    installments,
    invoice,
    observations,
    shippingCoast,
    status,
  }: IPurchaseDTO): Promise<void>;
  getById(id: string): Promise<Purchase>;
  listPurchases({ status, date }: IPurchaseFilterDTO): Promise<Purchase[]>;
  updateStatus(id: string, status: string): Promise<void>;
}

export { IPurchasesRepository };
