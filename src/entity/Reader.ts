import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Key } from "./Key";

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

    
    

    @ManyToMany(type => Key, key => key.readers)
    @JoinTable()
    keys: Key[];
}
