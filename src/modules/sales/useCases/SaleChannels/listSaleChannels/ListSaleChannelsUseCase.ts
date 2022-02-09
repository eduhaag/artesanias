import { inject, injectable } from 'tsyringe';

import { SaleChannel } from '@modules/sales/infra/typeorm/entities/SaleChannel';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';

@injectable()
class ListSaleChannelsUseCase {
  constructor(
    @inject('SaleChannelsRepository')
    private SaleChannelsRepository: ISaleChannelsRepository,
  ) {}

  async execute(): Promise<SaleChannel[]> {
    const channels = await this.SaleChannelsRepository.listAllChannels();

    return channels;
  }
}

export { ListSaleChannelsUseCase };
