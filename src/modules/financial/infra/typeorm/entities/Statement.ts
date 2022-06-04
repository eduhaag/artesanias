import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Purchase } from '@modules/purchases/infra/typeorm/entities/Purchase';
import { Sale } from '@modules/sales/infra/typeorm/entities/Sale';

import { BankAccount } from './BankAccount';
import { Ledger } from './Ledger';

@Entity('statement')
class Statement {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'sale_id' })
  saleId?: number;

  @ManyToOne(() => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale?: Sale;

  @Column({ name: 'purchase_id' })
  purchaseId?: string;

  @ManyToOne(() => Purchase)
  @JoinColumn({ name: 'purchase_id' })
  purchase?: Purchase;

  @Column({ name: 'ledger_id' })
  ledgerId: number;

  @ManyToOne(() => Ledger)
  @JoinColumn({ name: 'ledger_id' })
  ledger?: Ledger;

  @Column({ name: 'bank_account_id' })
  bankAccountId: number;

  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'bank_account_id' })
  bankAccount?: BankAccount;

  @Column({ name: 'to_fulfilled' })
  toFulfilled: Date;

  @Column({ name: 'fulfilled_on' })
  fulfilledOn?: Date;

  @Column()
  description: string;

  @Column()
  value: number;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Statement };
