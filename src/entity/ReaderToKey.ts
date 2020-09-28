import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Key } from "./Key";
import { Reader } from "./Reader"

@Entity()
export class ReaderToKey {


    @Column("integer", { default: 1 })
    acctype: number

    @Column("integer", { default: 0 })
    acctype2: number

    @Column("integer", { default: 0 })
    acctype3: number

    @Column("integer", { default: 0 })
    acctype4: number

    @ManyToOne(type => Key, key => key.readerToKeys, { primary: true })
    public key!: Key;

    @ManyToOne(type => Reader, reader => reader.readerToKeys, { primary: true })
    public reader!: Reader;

}
