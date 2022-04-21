import { getRepository, Repository } from 'typeorm';

import { ISaleProductDTO } from '@modules/sales/dtos/ISaleProductDTO';
import { ISaleProductsRepository } from '@modules/sales/repositories/ISaleProductsRepository';

import { SaleProduct } from '../entities/SaleProduct';

class SaleProductsRepository implements ISaleProductsRepository {
  private repository: Repository<SaleProduct>;

  constructor() {
    this.repository = getRepository(SaleProduct);
  }

  async createSaleProduct({
    price,
    productId,
    saleId,
    quantity,
    discount,
    observations,
    theme,
  }: ISaleProductDTO): Promise<SaleProduct> {
    const saleProduct = this.repository.create({
      price,
      productId,
      saleId,
      quantity,
      discount,
      observations,
      theme,
    });

    await this.repository.save(saleProduct);

    return saleProduct;
  }

  async updateSaleProduct({
    price,
    productId,
    saleId,
    quantity,
    discount,
    observations,
    theme,
    id,
  }: ISaleProductDTO): Promise<void> {
    await this.repository.update(id, {
      price,
      productId,
      saleId,
      quantity,
      discount,
      observations,
      theme,
    });
  }

  async deleteSaleProduct(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: number): Promise<SaleProduct> {
    const saleProduct = await this.repository.findOne(id);

    return saleProduct;
  }
}

export { SaleProductsRepository };
