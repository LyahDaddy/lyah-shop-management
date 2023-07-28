import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './Products';

@Entity()
export class Categories {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  type: string;

  @OneToMany(() => Products, (product) => product.category)
  products: Products[]
}