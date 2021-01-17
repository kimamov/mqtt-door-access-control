import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { AccessLog } from "./AccessLog";
import { Lock } from "./Lock";
import { NewKey } from "./NewKey";
import { ReaderKey } from "./ReaderKey";

@Entity()
export class Building {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true, length: 100, nullable: false })
    name: string;

    @OneToMany(()=>Lock, lock=>lock.building, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    locks: Lock[];

    

}
