import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('badges') 
@Unique(['title']) 
export class Badge {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @Column()
  title: string;

  @Column()
  requiredLevel: number;
}
