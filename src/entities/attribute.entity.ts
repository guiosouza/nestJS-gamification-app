import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity('attributes')
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  exp: number;

  @Column()
  level: number;

  @ManyToMany(() => Task, (task) => task.attributes) 
  @JoinTable()
  tasks: Task[];

  @ManyToMany(() => User, (user) => user.attributes)
  users: User[];
}
