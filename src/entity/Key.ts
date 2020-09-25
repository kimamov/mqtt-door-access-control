import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 20, nullable: false, primary: true })
    uuid: string;

    @Column("varchar", { nullable: false })
    user: string;

    @Column("integer", { default: 1 })
    acctype: number

    @Column("bigint", { default: Date.now() + 2000 })
    validuntil: number
}
