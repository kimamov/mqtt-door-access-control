import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Apartment } from "./Apartment";
import { Lock } from "./Lock";

@Entity()
export class Building {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 100, nullable: false })
    name: string;

    @Column("varchar", { unique: true, length: 100, nullable: true })
    thumbnailSrc: string;

    @OneToMany(()=>Lock, lock=>lock.building, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    locks: Lock[];

    @OneToMany(()=>Apartment, apartment=>apartment.building, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    apartments: Apartment[];

    

}
