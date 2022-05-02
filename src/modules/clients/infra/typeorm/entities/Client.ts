import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Address } from './Address';

@Entity('clients')
class Client {
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

  @Column()
  birthday?: Date;

  @Column({ name: 'hashed_password' })
  hashedPassword?: string;

  @Column({ name: 'accept_marketing' })
  acceptMarketing?: boolean;

  @OneToMany(() => Address, address => address.client, {
    cascade: ['insert', 'remove', 'soft-remove', 'recover'],
  })
  addresses: Address[];

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

export { Client };
