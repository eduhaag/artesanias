import { inject, injectable } from 'tsyringe';

import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class DeleteSaleChannelUseCase {
  constructor(
    @inject('SaleChannelsRepository')
    private SaleChannelsRepository: ISaleChannelsRepository,
  ) {}

  async execute(id: number): Promise<void> {
    const channelInDB = await this.SaleChannelsRepository.findById(id);

    if (!channelInDB) {
      throw new AppError('Sale channel does not found', 404);
    }

    await this.SaleChannelsRepository.deleteSaleChannel(id);
  }
}

export { DeleteSaleChannelUseCase };
