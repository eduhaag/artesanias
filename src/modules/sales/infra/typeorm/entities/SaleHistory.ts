import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Sale } from './Sale';

@Entity('sales_history')
class SaleHistory {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'sale_id' })
  saleId?: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale?: Sale;

  @Column()
  history: string;

  @CreateDateColumn()
  created_at?: Date;
}

export { SaleHistory };
