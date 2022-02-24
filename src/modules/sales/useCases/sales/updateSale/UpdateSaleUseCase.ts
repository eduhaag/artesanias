import { inject, injectable } from 'tsyringe';

import { ISaleDTO } from '@modules/sales/dtos/ISaleDTO';
import { IPaymentMethodsRepository } from '@modules/sales/repositories/IPaymentMethodsRepository';
import { ISaleChannelsRepository } from '@modules/sales/repositories/ISaleChannelsRepository';
import { ISalesHistoryRepository } from '@modules/sales/repositories/ISalesHistoryRepository';
import { ISalesRepository } from '@modules/sales/repositories/ISalesRepository';
import { ISaleStatusRepository } from '@modules/sales/repositories/ISaleStatusRepository';
import { IShippingMethodsRepository } from '@modules/sales/repositories/IShippingMethodsRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class UpdateSaleUseCase {
  constructor(
    @inject('SalesRepository')
    private SaleRepository: ISalesRepository,

    @inject('SaleChannelsRepository')
    private SaleChannelsRepository: ISaleChannelsRepository,

    @inject('PaymentMethodsRepository')
    private PaymentMethodsRepository: IPaymentMethodsRepository,

    @inject('ShippingMethodsRepository')
    private ShippingMethodsRepository: IShippingMethodsRepository,

    @inject('SaleStatusRepository')
    private SaleStatusRepository: ISaleStatusRepository,

    @inject('SalesHistoryRepository')
    private SalesHistoryRepository: ISalesHistoryRepository,
  ) {}

  async execute({
    id,
    invoiceId,
    channelId,
    paymentMethodId,
    shippingForecast,
    shippingId,
    addition,
    city,
    complement,
    discount,
    district,
    number,
    observation,
    reference,
    shippingCoast,
    state,
    street,
    zipCode,
    statusId,
  }: ISaleDTO): Promise<void> {
    const checkSaleExists = await this.SaleRepository.getSaleById(id);

    if (!checkSaleExists) {
      throw new AppError('Sale does not found.', 404);
    }

    // Verifica se canal existe
    const channelExists = await this.SaleChannelsRepository.findById(channelId);
    if (!channelExists) {
      throw new AppError('Sale channel does not found.', 404);
    }

    // verifica se existe o metodo de pagamento
    const paymentMethodExists =
      await this.PaymentMethodsRepository.findMethodByID(paymentMethodId);
    if (!paymentMethodExists) {
      throw new AppError('Payment method does not exists.', 404);
    }

    // Verifica se existe o metodo de envio
    const shippingMethodExists =
      await this.ShippingMethodsRepository.findShippingMethodByID(shippingId);
    if (!shippingMethodExists) {
      throw new AppError('Shipping method does not exists.', 404);
    }

    // Verifica se status existe
    const saleStatusExists = await this.SaleStatusRepository.findSaleStatusById(
      statusId,
    );
    if (!saleStatusExists) {
      throw new AppError('Sale status does not found.', 404);
    }

    await this.SalesHistoryRepository.createHistory(
      id,
      `Status do pedido atualizado para ${saleStatusExists.name}.`,
    );

    await this.SaleRepository.updateSale({
      id,
      channelId,
      paymentMethodId,
      shippingForecast,
      shippingId,
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
      invoiceId,
      zipCode,
      statusId,
      reference,
    });
  }
}

export { UpdateSaleUseCase };
