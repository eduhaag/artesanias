import { getRepository, Repository } from 'typeorm';

import {
  IPurchaseDTO,
  IPurchaseFilterDTO,
} from '@modules/purchases/dtos/IPurchaseDTO';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';

import { Purchase } from '../entities/Purchase';

class PurchasesRepository implements IPurchasesRepository {
  private repository: Repository<Purchase>;

  constructor() {
    this.repository = getRepository(Purchase);
  }

  async createPurchase({
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
  }: IPurchaseDTO): Promise<Purchase> {
    const purchase = this.repository.create({
      discount,
      addition,
      installments,
      invoiceId: invoice,
      observations,
      products,
      shippingCoast,
      statements,
      status,
      supplier,
    });

    await this.repository.save(purchase);

    return purchase;
  }

  async updatePurchase({
    id,
    addition,
    discount,
    installments,
    invoice,
    observations,
    shippingCoast,
  }: IPurchaseDTO): Promise<void> {
    await this.repository.update(id, {
      addition,
      discount,
      installments,
      invoiceId: invoice,
      observations,
      shippingCoast,
    });
  }

  async getById(id: string): Promise<Purchase> {
    const purchase = await this.repository.findOne(id, {
      relations: [
        'supplier',
        'products',
        'products.product',
        'statements',
        'inventory',
      ],
    });

    return purchase;
  }

  async listPurchases({
    status,
    date,
  }: IPurchaseFilterDTO): Promise<Purchase[]> {
    const purchaseQuery = this.repository
      .createQueryBuilder('p')
      .leftJoinAndSelect('p.supplier', 'supplier')
      .leftJoinAndSelect('p.products', 'products');

    if (status) {
      purchaseQuery.andWhere('p.status = :status', { status });
    }

    if (date) {
      purchaseQuery.andWhere('p.created_at BETWEEN :from AND :to', {
        from: date.from,
        to: date.to,
      });
    }

    const purchases = await purchaseQuery.getMany();

    return purchases;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await this.repository.update(id, { status });
  }
}

export { PurchasesRepository };
