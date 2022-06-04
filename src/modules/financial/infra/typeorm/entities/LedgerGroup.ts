import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Ledger } from './Ledger';

@Entity('ledger_groups')
class LedgerGroup {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column()
  description?: string;

  @OneToMany(() => Ledger, ledger => ledger.ledgerGroup)
  ledgers: Ledger;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  Deleted_at: Date;
}

export { LedgerGroup };
