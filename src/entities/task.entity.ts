import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { Attribute } from './attribute.entity';

@Entity('tasks') 
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  exp: number;

  @Column()
  isTimeBased: boolean;

  @Column()
  timePack: number;

  @Column()
  totalTime: number;

  @Column()
  status: boolean;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => Attribute, (attribute) => attribute.tasks)
  attributes: Attribute[];
}
