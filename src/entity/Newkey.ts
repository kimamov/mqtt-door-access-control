import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Newkey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 20, nullable: false, primary: true })
    uid: string;

    @Column("varchar", { nullable: false, length: 20 })
    type: string;

    @Column("varchar", { nullable: false, length: 10 })
    isknown: string;

    @Column("varchar", { nullable: false, length: 50 })
    username: string;

    @Column("varchar", { nullable: false, length: 50 })
    door: string;

    @Column("int")
    time: number;
}
