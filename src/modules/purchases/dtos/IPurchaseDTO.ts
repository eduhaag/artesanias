import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';

import { PurchaseProduct } from '../infra/typeorm/entities/PurchaseProduct';
import { Supplier } from '../infra/typeorm/entities/Supplier';

interface IPurchaseDTO {
  id?: string;
  supplier?: Supplier;
  status?: string;
  invoice?: string;
  observations?: string;
  discount?: number;
  addition?: number;
  shippingCoast?: number;
  installments?: number;
  products?: PurchaseProduct[];
  statements?: Statement[];
  productsType?: 'Material' | 'Package';
  paymentAccountId?: number;
}

interface IPurchaseFilterDTO {
  status?: string;
  date?: {
    from: Date;
    to: Date;
  };
}

export { IPurchaseDTO, IPurchaseFilterDTO };
