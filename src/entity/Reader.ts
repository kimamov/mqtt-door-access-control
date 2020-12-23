import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { AccessLog } from "./AccessLog";
import { Key } from "./Key";
import { NewKey } from "./NewKey";

@Entity()
export class Reader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false })
    ip: string;

    @Column("varchar", { unique: true, length: 100, nullable: false })
    readerName: string;

    @Column("timestamp")
    lastPing: Date

    @OneToMany(()=>AccessLog, access=>access.reader)
    accessLogs: AccessLog[];

    @OneToMany(()=>NewKey, newKey=>newKey.reader)
    newKeys: NewKey[];
    

    @ManyToMany(type => Key, key => key.readers)
    @JoinTable()
    keys: Key[];
}
