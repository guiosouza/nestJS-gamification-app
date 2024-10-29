import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, Unique } from 'typeorm';
import { Task } from './task.entity';
import { Attribute } from './attribute.entity';
import { Badge } from './badge.entity';

@Entity('users')
@Unique(['name']) // Define que o campo 'name' é único
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  totalExp: number;

  @ManyToOne(() => Badge, { nullable: true })
  badge: Badge;

  @Column({ default: 1 })
  level: number;

  @OneToMany(() => Task, (task) => task.user, { cascade: true, onDelete: 'CASCADE' })
  tasks: Task[];
  
  @ManyToMany(() => Attribute, (attribute) => attribute.users, { cascade: true })
  attributes: Attribute[];  
}
