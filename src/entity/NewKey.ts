import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Reader } from "./Reader";

@Entity()
export class NewKey {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false })
    uid: string;

    @Column("varchar")
    name: string;

    @Column("timestamp")
    time: Date

    @Column("varchar", { nullable: false, length: 20 })
    door: string;

    @ManyToOne(()=> Reader, reader=> reader.newKeys)
    reader: Reader;


}
