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

import { Sale } from './Sale';

@Entity('sales_products')
class SaleProduct {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'sale_id' })
  saleId: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @Column({ name: 'product_id' })
  productId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  quantity: number;

  @Column()
  theme?: string;

  @Column()
  observations?: string;

  @Column()
  price: number;

  @Column()
  discount?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { SaleProduct };
