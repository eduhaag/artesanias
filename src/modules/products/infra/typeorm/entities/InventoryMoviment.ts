import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Purchase } from '@modules/purchases/infra/typeorm/entities/Purchase';
import { Sale } from '@modules/sales/infra/typeorm/entities/Sale';

import { Product } from './Product';

@Entity('inventory_moviment')
class InventoryMoviment {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'material_id' })
  materialId: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'material_id' })
  material: Product;

  @Column({ name: 'sale_id' })
  saleId?: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  @ManyToOne(() => Purchase)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;

  @Column({ name: 'purchase_id' })
  purchaseId?: string;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @Column()
  coast: number;

  @Column()
  history?: string;

  @CreateDateColumn()
  created_at: Date;
}

export { InventoryMoviment };
