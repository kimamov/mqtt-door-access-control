import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AccessLog } from "./AccessLog";
import { NewKey } from "./NewKey";
import { ReaderKey } from "./ReaderKey";
import {Event as ControllerEvent} from "./Event";

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

    @Column("varchar", { default: "acctype5" })
    acctype5Name: string

    @Column("varchar", { default: "acctype6" })
    acctype6Name: string


    @OneToMany(()=>AccessLog, access=>access.reader, {cascade: true})
    accessLogs: AccessLog[];

    @OneToMany(()=>ControllerEvent, controllerEvent=>controllerEvent.reader, {cascade: true})
    events: ControllerEvent[];

    @OneToMany(()=>NewKey, newKey=>newKey.reader, {cascade: true})
    newKeys: NewKey[];
    

    @OneToMany(()=>ReaderKey, readerKey=>readerKey.reader, {cascade: true})
    readerKeys: ReaderKey[];

    
    
}
