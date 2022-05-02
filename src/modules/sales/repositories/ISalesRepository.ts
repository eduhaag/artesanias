import { ISaleDTO, ISaleFilterDTO } from '../dtos/ISaleDTO';
import { Sale } from '../infra/typeorm/entities/Sale';

interface ISalesRepository {
  createSale({
    client,
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
    products,
    zipCode,
    installments,
  }: ISaleDTO): Promise<Sale>;
  updateSale({
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
    installments,
    zipCode,
    statusId,
    invoiceId,
    reference,
  }: ISaleDTO): Promise<void>;
  getSaleById(id: number): Promise<Sale>;
  listSales({
    client,
    channels,
    iniDateFrom,
    iniDateTo,
    sendDateFrom,
    sendDateTo,
    shipping,
    status,
  }: ISaleFilterDTO): Promise<Sale[]>;
  updateSaleStatus(saleId: number, statusId: number): Promise<void>;
}

export { ISalesRepository };
