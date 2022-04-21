import { ISaleProductDTO } from '../dtos/ISaleProductDTO';
import { SaleProduct } from '../infra/typeorm/entities/SaleProduct';

interface ISaleProductsRepository {
  createSaleProduct({
    price,
    productId,
    saleId,
    quantity,
    discount,
    observations,
    theme,
  }: ISaleProductDTO): Promise<SaleProduct>;
  updateSaleProduct({
    price,
    productId,
    saleId,
    quantity,
    discount,
    observations,
    theme,
    id,
  }: ISaleProductDTO): Promise<void>;
  deleteSaleProduct(id: number): Promise<void>;
  findById(id: number): Promise<SaleProduct>;
}

export { ISaleProductsRepository };
