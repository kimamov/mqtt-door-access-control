import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany, JoinColumn, JoinTable } from "typeorm";
import { Apartment } from "./Apartment";
import { Building } from "./Building";
import { Key } from "./Key";
import { Reader } from "./Reader";


@Entity()
export class Lock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100, nullable: false, default: "unbekanntes Schloss" })
    name: string;

    @Column("int", { nullable: true })
    number: string;

    @Column("varchar", { length: 100, nullable: false, default: "room" })
    type: string;

    @Column("int", { default: 1 })
    slot: number

    @Column("boolean", { default: false })
    open: boolean

    @Column("boolean", { default: false })
    taken: boolean

    @Column({ type: "int", nullable: true })
    buildingId: number;

    @ManyToOne(()=> Building, building=> building.locks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: "buildingId"})
    public building: Building;

    @Column({ type: "int", nullable: true })
    apartmentId: number;

    @ManyToOne(()=> Apartment, apartment=> apartment.locks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: "apartmentId"})
    public apartment: Apartment;


    @Column({ type: "int", nullable: true })
    readerId: number;

    @ManyToOne(()=> Reader, reader=> reader, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: "readerId"})
    public reader: Reader;


    @ManyToMany(type => Lock, lock => lock.previousLocks)
    @JoinTable()
    public nextLocks: Lock[];
 
    @ManyToMany(type=> Lock, lock => lock.nextLocks)
    @JoinTable()
    public previousLocks: Lock[];

    @OneToMany(type=> Key, key => key.lock, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    public keys: Key[];
}
