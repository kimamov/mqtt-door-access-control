import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, ManyToOne } from "typeorm";
import { Reader } from "./Reader";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false })
    type: string;

    @Column("varchar", { nullable: false, length: 60 })
    src: string;

    @Column("varchar", { nullable: true, length: 100 })
    description: string;

    @Column("varchar", { nullable: false, length: 60 })
    data: string;

    @Column("timestamp")
    time: Date;

    @Column("varchar", { nullable: false, length: 100 })
    door: string;

    @ManyToOne(()=> Reader, reader=> reader.events)
    reader: Reader;
}
