import { Entity, Index, Column, ManyToOne, PrimaryColumn, JoinTable } from "typeorm";
import { Key } from "./Key";
import { Reader } from "./Reader"

@Entity()
export class ReaderToKey {


    @PrimaryColumn()
    readerId: number;

    @PrimaryColumn()
    keyId: number;

    /* @Column("varchar")
    keyName: string; */


    @ManyToOne(() => Key, key => key.readerToKeys, {
        primary: true
    })
    @JoinTable({ name: "keyId" })
    key: Key;

    @ManyToOne(() => Reader, reader => reader.readerToKeys, {
        primary: true
    })
    @JoinTable({ name: "readerId" })
    reader: Reader;

}
