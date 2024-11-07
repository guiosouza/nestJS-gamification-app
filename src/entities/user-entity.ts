import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column({ default: "Novice" })
    patent: string;

    @Column()
    level: number;
}