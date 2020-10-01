import { Entity, Column, OneToMany } from "typeorm";
import { ReaderToKey } from "./ReaderToKey";

@Entity()
export class Reader {

    @Column("varchar", { unique: true, length: 15, primary: true, nullable: false })
    ip: string;

    @Column("varchar", { unique: true, length: 40 })
    doorname: string;

    @Column("bigint", { default: 0, nullable: false })
    lastPing: number

    @OneToMany(type => ReaderToKey, readerToKey => readerToKey.reader)
    readerToKeys!: ReaderToKey[];
}
