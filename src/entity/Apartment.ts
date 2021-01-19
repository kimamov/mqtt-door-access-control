import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToOne } from "typeorm";
import { Building } from "./Building";
import { Lock } from "./Lock";


@Entity()
export class Apartment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 100, nullable: false, default: "unbekanntes Schloss" })
    name: string;

    @Column("varchar", { nullable: true })
    info: string;


    @Column({ type: "int", nullable: true })
    buildingId: number;

    @ManyToOne(()=> Building, building=> building.apartments, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({name: "buildingId"})
    public building: Building;

    @OneToMany(()=>Lock, lock=>lock.building, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    locks: Lock[];

}
