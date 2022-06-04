import { Client } from '@modules/clients/infra/typeorm/entities/Client';

import { SaleHistory } from '../infra/typeorm/entities/SaleHistory';
import { SaleProduct } from '../infra/typeorm/entities/SaleProduct';

interface ISaleDTO {
  id?: number;
  client?: Client;
  shippingId: number;
  paymentMethodId: number;
  channelId: number;
  statusId?: number;
  shippingForecast: Date;
  invoiceId?: string;
  reference?: string;
  zipCode?: string;
  street?: string;
  number?: number;
  complement?: string;
  district?: string;
  city?: string;
  state?: string;
  observation?: string;
  discount?: number;
  addition?: number;
  shippingCoast?: number;
  history?: SaleHistory[];
  products?: SaleProduct[];
}

interface ISaleFilterDTO {
  client?: string;
  status?: number[];
  channels?: number[];
  shipping?: number[];
  sendDateFrom?: Date;
  sendDateTo?: Date;
  iniDateFrom?: Date;
  iniDateTo?: Date;
}

export { ISaleDTO, ISaleFilterDTO };
