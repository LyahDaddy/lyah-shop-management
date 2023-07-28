import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';
import { Products } from './Products';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderDate: Date;

  @ManyToOne(() => Users, (user) => user.orders)
  user: Users;

  @ManyToOne(() => Users, (user) => user.modifiedOrders)
  modefiedUser: Users;

  @ManyToMany(() => Products, (product) => product.orders)
  @JoinTable()
  products: Products[];
}