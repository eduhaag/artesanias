import { getRepository, Repository } from 'typeorm';

import { ISaleChannelDTO } from '@modules/sales/dtos/ISaleChannelDTO';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';

import { SaleChannel } from '../entities/SaleChannel';

class SaleChannelsRepository implements ISaleChannelsRepository {
  private repository: Repository<SaleChannel>;

  constructor() {
    this.repository = getRepository(SaleChannel);
  }

  async createSaleChannel({
    name,
    description,
  }: ISaleChannelDTO): Promise<SaleChannel> {
    const channel = this.repository.create({ name, description });

    await this.repository.save(channel);

    return channel;
  }

  async updateSaleChannel({
    id,
    name,
    description,
  }: ISaleChannelDTO): Promise<void> {
    await this.repository.update(id, { name, description });
  }

  async deleteSaleChannel(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }

  async listAllChannels(): Promise<SaleChannel[]> {
    const channels = await this.repository.find();

    return channels;
  }

  async findById(id: number): Promise<SaleChannel> {
    const channel = await this.repository.findOne(id);

    return channel;
  }

  async findByName(name: string): Promise<SaleChannel> {
    const channel = await this.repository.findOne({ where: { name } });

    return channel;
  }
}

export { SaleChannelsRepository };
