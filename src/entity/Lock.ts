import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { AccessLog } from "./AccessLog";
import { Building } from "./Building";
import { NewKey } from "./NewKey";
import { ReaderKey } from "./ReaderKey";

@Entity()
export class Lock {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 100, nullable: false })
    name: string;

    @ManyToOne(()=> Building, building=> building.locks, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    building: Building;

    

}
