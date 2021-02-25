import {
  Entity,
  DeleteDateColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

import Client from './Client';

@Entity('adresses')
class Address {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  cep: number;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: true })
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  principal: boolean;

  @ManyToOne(() => Client, client => client.adresses, {
    cascade: true,
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Address;
