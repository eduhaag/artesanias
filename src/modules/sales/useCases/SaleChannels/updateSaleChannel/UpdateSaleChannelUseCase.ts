import { inject, injectable } from 'tsyringe';

import { ISaleChannelDTO } from '@modules/sales/dtos/ISaleChannelDTO';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateSaleChannelUseCase {
  constructor(
    @inject('SaleChannelsRepository')
    private SaleChannelsRepository: ISaleChannelsRepository,
  ) {}

  async execute({ id, name, description }: ISaleChannelDTO): Promise<void> {
    const channelInDB = await this.SaleChannelsRepository.findById(id);

    if (!channelInDB) {
      throw new AppError('Sale channel does not found', 404);
    }

    if (channelInDB.name !== name) {
      const checkIfNameExists = await this.SaleChannelsRepository.findByName(
        name,
      );

      if (checkIfNameExists) {
        throw new AppError('Channel name already exists.');
      }
    }

    await this.SaleChannelsRepository.updateSaleChannel({
      id,
      name,
      description,
    });
  }
}

export { UpdateSaleChannelUseCase };
