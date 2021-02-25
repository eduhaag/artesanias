import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

import Address from './Address';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'cpf_cnpj', nullable: true })
  cpfCnpj: string;

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  birthday: Date;

  @Column({ name: 'accept_marketing' })
  acceptMarketing: boolean;

  @OneToMany(() => Address, address => address.client, { onDelete: 'CASCADE' })
  adresses: Address[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}

export default Client;
