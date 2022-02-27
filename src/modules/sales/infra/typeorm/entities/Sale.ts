import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Client } from '@modules/clients/infra/typeorm/entities/Client';
import { InventoryMoviment } from '@modules/products/infra/typeorm/entities/InventoryMoviment';

import { PaymentMethod } from './PaymentMethod';
import { SaleChannel } from './SaleChannel';
import { SaleHistory } from './SaleHistory';
import { SaleProduct } from './SaleProduct';
import { SaleStatus } from './SaleStatus';
import { ShippingMethod } from './ShippingMethod';

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'client_id' })
  clientId: string;

  @ManyToOne(() => Client, { cascade: ['insert'] })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @Column({ name: 'shipping_id' })
  shippingId: number;

  @ManyToOne(() => ShippingMethod)
  @JoinColumn({ name: 'shipping_id' })
  shippingMethod: ShippingMethod;

  @Column({ name: 'payment_method_id' })
  paymentMethodId: number;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;

  @Column({ name: 'channel_id' })
  channelId: number;

  @ManyToOne(() => SaleChannel)
  @JoinColumn({ name: 'channel_id' })
  channel: SaleChannel;

  @Column({ name: 'status_id' })
  statusId: number;

  @ManyToOne(() => SaleStatus)
  @JoinColumn({ name: 'status_id' })
  status: SaleStatus;

  @Column({ name: 'shipping_forecast' })
  shippingForecast: Date;

  @Column({ name: 'invoice_id' })
  invoiceId: string;

  @Column()
  reference?: string;

  @Column({ name: 'zip_code' })
  zipCode?: string;

  @Column()
  street?: string;

  @Column()
  number?: number;

  @Column()
  complement?: string;

  @Column()
  district?: string;

  @Column()
  city?: string;

  @Column()
  state?: string;

  @Column()
  observation?: string;

  @Column()
  discount?: number;

  @Column()
  addition?: number;

  @Column({ name: 'shipping_coast' })
  shippingCoast?: number;

  @OneToMany(() => SaleProduct, product => product.sale, {
    cascade: ['insert'],
  })
  products: SaleProduct[];

  @OneToMany(() => SaleHistory, history => history.sale, {
    cascade: ['insert', 'update'],
  })
  history: SaleHistory[];

  @OneToMany(() => InventoryMoviment, inventory => inventory.sale)
  inventory: InventoryMoviment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Sale };
