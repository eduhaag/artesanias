import { IPurchaseProductDTO } from '../dtos/IPurchaseProductDTO';
import { PurchaseProduct } from '../infra/typeorm/entities/PurchaseProduct';

interface IPurchaseProductsRepository {
  createPurchaseProduct({
    productId,
    purchaseId,
    price,
    quantity,
    reference,
  }: IPurchaseProductDTO): Promise<PurchaseProduct>;
  updatePurchaseProduct({
    id,
    price,
    quantity,
    reference,
  }: IPurchaseProductDTO): Promise<void>;
  deletePurchaseProduct(id: number): Promise<void>;
  getById(id: number): Promise<PurchaseProduct>;
}

export { IPurchaseProductsRepository };
