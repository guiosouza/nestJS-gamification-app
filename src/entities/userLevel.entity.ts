import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('userlevels')
export class UserLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  expRequired: number;
}
