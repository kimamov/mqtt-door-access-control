import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AccessLog } from "./AccessLog";
import { NewKey } from "./NewKey";
import { ReaderKey } from "./ReaderKey";

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

    @Column("varchar", { default: "acctype" })
    acctypeName: string

    @Column("varchar", { default: "acctype2" })
    acctype2Name: string

    @Column("varchar", { default: "acctype3" })
    acctype3Name: string

    @Column("varchar", { default: "acctype4" })
    acctype4Name: string


    @OneToMany(()=>AccessLog, access=>access.reader, {cascade: true})
    accessLogs: AccessLog[];

    @OneToMany(()=>NewKey, newKey=>newKey.reader, {cascade: true})
    newKeys: NewKey[];
    

    @OneToMany(()=>ReaderKey, readerKey=>readerKey.reader, {cascade: true})
    readerKeys: ReaderKey[];

    
    
}
