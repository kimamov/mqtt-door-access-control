import { Entity, Column, OneToMany, PrimaryColumn, Generated, PrimaryGeneratedColumn } from "typeorm";
import { ReaderToKey } from "./ReaderToKey";

@Entity()
export class Reader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 15, nullable: false })
    ip: string;

    @Column("varchar", { unique: true, length: 40, nullable: false })
    readerName: string;

    @Column("timestamp")
    lastPing: Date

    
    @OneToMany(type => ReaderToKey, readerToKey => readerToKey.reader)
    readerToKeys!: ReaderToKey[];
}
