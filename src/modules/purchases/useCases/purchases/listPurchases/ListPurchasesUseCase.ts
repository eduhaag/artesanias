import { inject, injectable } from 'tsyringe';

import { IPurchaseFilterDTO } from '@modules/purchases/dtos/IPurchaseDTO';
import { Purchase } from '@modules/purchases/infra/typeorm/entities/Purchase';
import { IPurchasesRepository } from '@modules/purchases/repositories/IPurchasesRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProveider';

@injectable()
class ListPurchasesUseCase {
  constructor(
    @inject('PurchasesRepository')
    private PurchasesRepository: IPurchasesRepository,

    @inject('DateProvider')
    private DateProvider: IDateProvider,
  ) {}

  async execute({ date, status }: IPurchaseFilterDTO): Promise<Purchase[]> {
    let formatedDate;
    console.log('date', date);
    if (date) {
      formatedDate = {
        from: date.from,
        to: this.DateProvider.setDatetoEndOfDay(date.to.toString()),
      };
    } else {
      formatedDate = undefined;
    }

    console.log(formatedDate);

    const purchases = await this.PurchasesRepository.listPurchases({
      status,
      date: formatedDate,
    });

    return purchases;
  }
}

export { ListPurchasesUseCase };
