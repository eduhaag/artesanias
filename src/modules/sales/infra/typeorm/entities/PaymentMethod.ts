import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BankAccount } from '@modules/financial/infra/typeorm/entities/BankAccount';

@Entity('payment_methods')
class PaymentMethod {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'destination_account' })
  destinationAccount: number;

  @Column()
  name: string;

  @Column()
  description?: string;

  @Column({ name: 'fix_rate' })
  fixRate: number;

  @Column({ name: 'variable_rate' })
  variableRate: number;

  @Column({ name: 'credit_time' })
  creditTime: number;

  @ManyToOne(() => BankAccount)
  @JoinColumn({ name: 'destination_account' })
  account: BankAccount;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { PaymentMethod };
