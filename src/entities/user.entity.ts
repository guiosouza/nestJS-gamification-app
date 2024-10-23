import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne, Unique, BeforeInsert } from 'typeorm';
import { Task } from './task.entity';
import { Attribute } from './attribute.entity';
import { Badge } from './badge.entity';
import { getRepository } from 'typeorm';

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

  @Column({ default: 0 }) // totalExp começando com 1 por padrão
  totalExp: number;

  @Column({ default: 0 })
  expNeededToLevelUp: number;

  @ManyToOne(() => Badge, { nullable: true })
  badge: Badge;

  @Column({ default: 1 })
  level: number;

  @OneToMany(() => Task, (task) => task.user) // Um usuário pode ter várias tarefas
  tasks: Task[];

  @ManyToMany(() => Attribute, (attribute) => attribute.users) // Relacionamento com atributos
  attributes: Attribute[];

  // Hook para inserir a badge padrão "NOVICE"
  @BeforeInsert()
  async setDefaultBadge() {
    if (!this.badge) {
      const badgeRepository = getRepository(Badge);
      const noviceBadge = await badgeRepository.findOne({ where: { title: 'NOVICE' } });
      if (noviceBadge) {
        this.badge = noviceBadge;
      }
    }
  }
}
