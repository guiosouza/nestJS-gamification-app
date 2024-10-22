import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('badges') 
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  requiredLevel: number;
}
