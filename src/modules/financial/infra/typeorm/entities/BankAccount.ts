import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Statement } from './Statement';

@Entity('bank_accounts')
class BankAccount {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  name: string;

  @Column({ name: 'starting_balance' })
  startingBalance?: number;

  @Column({ name: 'is_fixed' })
  isFixed?: boolean;

  @OneToMany(() => Statement, statement => statement.bankAccount, {
    cascade: ['remove', 'soft-remove', 'recover'],
  })
  statements: Statement[];

  balance?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { BankAccount };
