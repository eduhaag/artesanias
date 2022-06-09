import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from '@modules/products/infra/typeorm/entities/Product';

import { Purchase } from './Purchase';

@Entity('purchase_products')
class PurchaseProduct {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'purchase_id' })
  purchaseId: string;

  @ManyToOne(() => Purchase)
  @JoinColumn({ name: 'purchase_id' })
  purchase?: Purchase;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  reference?: string;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { PurchaseProduct };
