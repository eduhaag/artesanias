import { inject, injectable } from 'tsyringe';

import { ISaleChannelDTO } from '@modules/sales/dtos/ISaleChannelDTO';
import { SaleChannel } from '@modules/sales/infra/typeorm/entities/SaleChannel';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateSaleChannelUseCase {
  constructor(
    @inject('SaleChannelsRepository')
    private SaleChannelsRepository: ISaleChannelsRepository,
  ) {}

  async execute({ name, description }: ISaleChannelDTO): Promise<SaleChannel> {
    const checkIfNameExists = await this.SaleChannelsRepository.findByName(
      name,
    );

    if (checkIfNameExists) {
      throw new AppError('Channel name already exists.');
    }

    const channel = await this.SaleChannelsRepository.createSaleChannel({
      name,
      description,
    });

    return channel;
  }
}

export { CreateSaleChannelUseCase };
