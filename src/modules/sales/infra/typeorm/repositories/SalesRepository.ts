import { getRepository, Repository } from 'typeorm';

import { ISaleDTO, ISaleFilterDTO } from '@modules/sales/dtos/ISaleDTO';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';

import { Sale } from '../entities/Sale';

class SalesRepository implements ISalesRepository {
  private repository: Repository<Sale>;

  constructor() {
    this.repository = getRepository(Sale);
  }

  async createSale({
    client,
    channelId,
    paymentMethodId,
    shippingForecast,
    shippingId,
    reference,
    addition,
    city,
    complement,
    discount,
    district,
    number,
    observation,
    shippingCoast,
    state,
    street,
    products,
    zipCode,
    history,
    statements,
  }: ISaleDTO): Promise<Sale> {
    const sale = this.repository.create({
      client,
      channelId,
      statusId: 1,
      paymentMethodId,
      shippingId,
      shippingForecast,
      reference,
      zipCode,
      street,
      number,
      complement,
      district,
      city,
      state,
      observation,
      addition,
      discount,
      shippingCoast,
      products,
      history,
      statements,
    });

    await this.repository.save(sale);

    return sale;
  }

  async updateSale({
    id,
    channelId,
    paymentMethodId,
    shippingForecast,
    shippingId,
    addition,
    reference,
    city,
    complement,
    discount,
    district,
    number,
    observation,
    shippingCoast,
    state,
    street,
    invoiceId,
    zipCode,
    statusId,
  }: ISaleDTO): Promise<void> {
    await this.repository.update(id, {
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
      addition,
      invoiceId,
      reference,
      city,
      complement,
      discount,
      district,
      number,
      observation,
      shippingCoast,
      state,
      street,
      zipCode,
      statusId,
    });
  }

  async getSaleById(id: number): Promise<Sale> {
    const sale = await this.repository.findOne(id, {
      relations: [
        'client',
        'shippingMethod',
        'paymentMethod',
        'channel',
        'status',
        'history',
        'products',
        'products.product',
        'statements',
      ],
    });

    return sale;
  }

  async listSales({
    client,
    channels,
    iniDateTo,
    iniDateFrom,
    sendDateTo,
    sendDateFrom,
    status,
  }: ISaleFilterDTO): Promise<Sale[]> {
    const salesQuery = this.repository
      .createQueryBuilder('sales')
      .leftJoinAndSelect('sales.client', 'client')
      .leftJoinAndSelect('sales.shippingMethod', 'shippingMethod')
      .leftJoinAndSelect('sales.status', 'status');

    if (client) {
      salesQuery.andWhere('client.name LIKE :clientName', {
        clientName: `%${client}%`,
      });
    }

    if (channels) {
      salesQuery.andWhere('sales.channelId IN(:...channels)', { channels });
    }

    if (status) {
      salesQuery.andWhere('sales.statusId IN(:...status)', { status });
    }

    if (iniDateFrom && iniDateTo) {
      salesQuery.andWhere('sales.created_at BETWEEN :init AND :end', {
        init: iniDateFrom,
        end: iniDateTo,
      });
    }

    if (sendDateFrom && sendDateTo) {
      salesQuery.andWhere('sales.shippingForecast BETWEEN :init AND :end', {
        init: sendDateFrom,
        end: sendDateTo,
      });
    }

    const sales = await salesQuery.getMany();

    return sales;
  }

  async updateSaleStatus(saleId: number, statusId: number): Promise<void> {
    await this.repository.update(saleId, { statusId });
  }
}

export { SalesRepository };
