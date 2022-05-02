import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Purchase } from './Purchase';

@Entity('suppliers')
class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  email?: string;

  @Column({ name: 'tax_code' })
  taxCode?: string;

  @Column()
  phone?: string;

  @OneToMany(() => Purchase, purchase => purchase.supplier)
  purchases: Purchase[];

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

export { Supplier };
