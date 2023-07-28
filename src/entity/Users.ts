import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Clients } from './Clients';
import { Roles } from './Roles';
import { Orders } from './Orders';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  firstName: string;
  
  @Column({ length: 100 })
  lastName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 200 })
  address: string;

  @Column({ length: 18 })
  phone: string;

  @ManyToOne(() => Clients, (client) => client.users)
  client: Clients;

  @ManyToOne(() => Roles, (role) => role.users)
  role: Roles;

  @OneToMany(() => Orders, (order) => order.user)
  orders: Orders[];

  @OneToMany(() => Orders, (order) => order.modefiedUser)
  modifiedOrders: Orders[];
}