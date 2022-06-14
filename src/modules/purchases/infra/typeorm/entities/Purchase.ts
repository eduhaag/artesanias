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
import { v4 as uuid } from 'uuid';

import { Statement } from '@modules/financial/infra/typeorm/entities/Statement';
import { InventoryMoviment } from '@modules/products/infra/typeorm/entities/InventoryMoviment';

import { PurchaseProduct } from './PurchaseProduct';
import { Supplier } from './Supplier';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'supplier_id' })
  supplierId: string;

  @ManyToOne(() => Supplier, { cascade: ['insert'] })
  @JoinColumn({ name: 'supplier_id' })
  supplier: Supplier;

  @Column()
  status: string;

  @Column({ name: 'invoice_id' })
  invoiceId?: string;

  @Column()
  observations?: string;

  @Column()
  discount?: number;

  @Column()
  addition?: number;

  @Column({ name: 'shipping_coast' })
  shippingCoast?: number;

  @Column()
  installments?: number;

  @OneToMany(() => Statement, statement => statement.purchase, {
    cascade: ['insert', 'remove', 'soft-remove', 'recover'],
  })
  statements: Statement[];

  @OneToMany(() => PurchaseProduct, product => product.purchase, {
    cascade: ['insert', 'update'],
  })
  products: PurchaseProduct[];

  @OneToMany(() => InventoryMoviment, inventory => inventory.purchase)
  inventory: InventoryMoviment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Purchase };
