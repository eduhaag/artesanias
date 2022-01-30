import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Client } from './Client';

@Entity('client_address')
class Address {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ name: 'client_id' })
  clientId: string;

  @Column()
  destinatary: string;

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column()
  complement?: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  main: boolean;

  @ManyToOne(() => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}

export { Address };
