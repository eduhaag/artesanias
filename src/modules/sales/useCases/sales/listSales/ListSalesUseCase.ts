import { inject, injectable } from 'tsyringe';

import { Sale } from '@modules/sales/infra/typeorm/entities/Sale';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProveider';

interface IRequest {
  channels: string;
  client: string;
  iniDateTo: string;
  iniDateFrom: string;
  sendDateTo: string;
  sendDateFrom: string;
  status: string;
}

@injectable()
class ListSalesUseCase {
  constructor(
    @inject('SalesRepository')
    private SalesRepository: ISalesRepository,

    @inject('DateProvider')
    private DateProvider: IDateProvider,
  ) {}

  async execute({
    channels,
    client,
    iniDateTo,
    iniDateFrom,
    sendDateTo,
    sendDateFrom,
    status,
  }: IRequest): Promise<Sale[]> {
    let channelsArray: number[];
    if (channels) {
      channelsArray = channels.split(',').map(item => {
        return parseInt(item, 10);
      });
    }

    let statusArray: number[];
    if (status) {
      statusArray = status.split(',').map(item => {
        return parseInt(item, 10);
      });
    }

    const sales = await this.SalesRepository.listSales({
      channels: channelsArray,
      client,
      iniDateFrom: this.DateProvider.stringToTimestamp(iniDateFrom),
      iniDateTo: this.DateProvider.setDatetoEndOfDay(iniDateTo),
      sendDateFrom: this.DateProvider.stringToTimestamp(sendDateFrom),
      sendDateTo: this.DateProvider.setDatetoEndOfDay(sendDateTo),
      status: statusArray,
    });

    return sales;
  }
}

export { ListSalesUseCase };
