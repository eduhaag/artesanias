import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ProductCategory } from './ProductCategory';
import { ProductComposition } from './ProductComposition';
import { ProductPicture } from './ProductPicture';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ name: 'category_id' })
  categoryId: number;

  @Column()
  coast: number;

  @Column()
  price: number;

  @Column()
  type: string;

  @Column({ name: 'moves_stock' })
  movesStock: boolean;

  @Column({ name: 'to_sale' })
  toSale: boolean;

  @Column()
  observations: string;

  @ManyToOne(() => ProductCategory)
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;

  @OneToMany(() => ProductPicture, picture => picture.product)
  pictures: ProductPicture[];

  @OneToMany(() => ProductComposition, composition => composition.product, {
    cascade: ['insert'],
  })
  composition: ProductComposition[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Product };
