import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Users } from './Users';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  email: string;

  @OneToMany(() => Users, (user) => user.client)
  users: Users[];
}