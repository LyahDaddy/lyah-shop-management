import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Clients } from './Clients';
import { Roles } from './Roles';
import { Orders } from './Orders';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, unique: true })
  username: string;

  @Column({ length: 100, nullable: true })
  firstName: string;
  
  @Column({ length: 100, nullable: true })
  lastName: string;

  @Column({ length: 100, nullable: true})
  email: string;

  @Column({ length: 200, nullable: true })
  address: string;

  @Column({ length: 18, nullable: true })
  phone: string;

  @Column({ type: 'date', nullable: true })
  created: Date;

  @Column({ type: 'date', nullable: true })
  lastLogin: Date;

  @ManyToOne(() => Clients, (client) => client.users)
  client: Clients;

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @OneToMany(() => Orders, (order) => order.modefiedUser)
  modifiedOrders: Orders[];
}