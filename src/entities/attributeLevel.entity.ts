import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('attributeLevels')
export class AttributeLevel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  level: number;

  @Column()
  expRequired: number;
}
