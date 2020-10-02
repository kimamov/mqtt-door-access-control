import { Entity, Index, Column, ManyToOne, PrimaryColumn, JoinTable } from "typeorm";
import { Key } from "./Key";
import { Reader } from "./Reader"

@Entity()
export class ReaderToKey {


    @PrimaryColumn()
    readerIp: string;

    @PrimaryColumn()
    keyId: number;

    @Column("integer", { default: 1 })
    acctype: number

    @Column("integer", { default: 0 })
    acctype2: number

    @Column("integer", { default: 0 })
    acctype3: number

    @Column("integer", { default: 0 })
    acctype4: number

    @ManyToOne(() => Key, key => key.readerToKeys, {
        primary: true
    })
    @JoinTable({ name: "keyId" })
    key: Key;

    @ManyToOne(() => Reader, reader => reader.readerToKeys, {
        primary: true
    })
    @JoinTable({ name: "readerIp" })
    reader: Reader;

}
