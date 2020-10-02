import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ReaderToKey } from "./ReaderToKey";

@Entity()
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false })
    uuid: string;

    @Column("varchar", { nullable: false, unique: true })
    user: string;



    @Column("bigint", { default: Date.now() + 2000 })
    validUntil: number

    @Column("bool", { default: false, nullable: false })
    isOneTimeCode: boolean



    @OneToMany(type => ReaderToKey, readerToKey => readerToKey.key)
    public readerToKeys!: ReaderToKey[];
}
