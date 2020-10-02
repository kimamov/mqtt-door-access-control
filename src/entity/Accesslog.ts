import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class Accesslog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: false })
    uid: string;

    @Column("varchar", { unique: true })
    userName: string;

    @Column("varchar")
    password: string;


}
