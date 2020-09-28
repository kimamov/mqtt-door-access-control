import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ReaderToKey } from "./ReaderToKey";

@Entity()
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 20, nullable: false })
    uuid: string;

    @Column("varchar", { nullable: false })
    user: string;



    @Column("bigint", { default: Date.now() + 2000 })
    validuntil: number

    @Column("bool", { default: false, nullable: false })
    isOneTimeCode: boolean



    @OneToMany(type => ReaderToKey, readerKey => readerKey.key)
    public readerToKeys!: ReaderToKey[];
}
