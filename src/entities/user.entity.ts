import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne } from 'typeorm';
import { Task } from './task.entity';
import { Attribute } from './attribute.entity';
import { Badge } from './badge.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  totalExp: number;

  @Column({ default: 0 })
  expNeededToLevelUp: number;

  @ManyToOne(() => Badge, { nullable: true })
  badge: Badge;

  @Column({ default: 1 })
  level: number;

  @OneToMany(() => Task, (task) => task.user) // An user can have many tasks
  tasks: Task[];

  @ManyToMany(() => Attribute, (attribute) => attribute.users) // Relacionamento com atributos
  attributes: Attribute[];
}
