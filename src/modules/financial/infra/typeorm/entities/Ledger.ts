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

import { LedgerGroup } from './LedgerGroup';
import { Statement } from './Statement';

@Entity('ledgers')
class Ledger {
  @PrimaryGeneratedColumn('increment')
  id?: number;

  @Column({ name: 'ledger_group_id' })
  ledgerGroupId: number;

  @ManyToOne(() => LedgerGroup)
  @JoinColumn({ name: 'ledger_group_id' })
  ledgerGroup: LedgerGroup;

  @Column()
  description?: string;

  @Column()
  type: 1 | -1;

  @OneToMany(() => Statement, statement => statement.ledger)
  statements: Statement[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

export { Ledger };
