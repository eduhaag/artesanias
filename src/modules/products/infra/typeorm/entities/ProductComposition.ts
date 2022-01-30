import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from './Product';

@Entity('product_composition')
class ProductComposition {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'product_id' })
  productId: string;

  @Column({ name: 'material_id' })
  materialId: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'material_id' })
  material?: Product;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export { ProductComposition };
