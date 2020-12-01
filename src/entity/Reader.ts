import { Entity, Column, OneToMany } from "typeorm";
import { ReaderToKey } from "./ReaderToKey";

@Entity()
export class Reader {

    @Column("varchar", { unique: true, length: 15, primary: true, nullable: false })
    ip: string;

    @Column("varchar", { unique: true, length: 40 })
    readerName: string;

    @Column("timestamp")
    lastPing: Date

    @OneToMany(type => ReaderToKey, readerToKey => readerToKey.reader)
    readerToKeys!: ReaderToKey[];
}
