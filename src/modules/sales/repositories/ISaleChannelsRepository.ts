import { ISaleChannelDTO } from '../dtos/ISaleChannelDTO';
import { SaleChannel } from '../infra/typeorm/entities/SaleChannel';

interface ISaleChannelsRepository {
  createSaleChannel({
    name,
    description,
  }: ISaleChannelDTO): Promise<SaleChannel>;
  updateSaleChannel({ id, name, description }: ISaleChannelDTO): Promise<void>;
  deleteSaleChannel(id: number): Promise<void>;
  listAllChannels(): Promise<SaleChannel[]>;
  findById(id: number): Promise<SaleChannel>;
  findByName(name: string): Promise<SaleChannel>;
}

export { ISaleChannelsRepository };
