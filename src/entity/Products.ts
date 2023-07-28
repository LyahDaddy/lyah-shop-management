import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Orders } from './Orders';
import { Categories } from './Categories';

@Entity()
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @ManyToMany(() => Orders, (order) => order.products)
  orders: Orders[];

  @ManyToOne(() => Categories, (category) => category.products)
  category: Categories;
}