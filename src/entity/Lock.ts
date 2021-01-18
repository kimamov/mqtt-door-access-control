import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Building } from "./Building";
import { Key } from "./Key";
import { Reader } from "./Reader";


@Entity()
export class Lock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 100, nullable: false })
    name: string;

    @Column("varchar", { unique: true, length: 100, nullable: false, default: "room" })
    type: string;

    @ManyToOne(()=> Building, building=> building.locks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    public building: Building;


    @ManyToOne(()=> Reader, reader=> reader, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    public reader: Reader;

    @Column("int", { default: 1 })
    slot: number

    /* @ManyToMany(()=>Lock, lock=>lock.nextLocks)
    previousLocks: Lock[];

    @ManyToMany(()=>Lock, lock=>lock.previousLocks)
    nextLocks: Lock[]; */

    @ManyToMany(type => Lock, lock => lock.previousLocks)
    @JoinTable()
    public nextLocks: Lock[];
 
    @ManyToMany(type=> Lock, lock => lock.nextLocks)
    @JoinTable()
    public previousLocks: Lock[];

    @OneToMany(type=> Key, key => key.lock, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    public keys: Key[];
}
