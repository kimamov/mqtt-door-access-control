import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Reader {

    @Column("varchar", { unique: true, length: 15, primary: true, nullable: false })
    ip: string;

    @Column("varchar", { unique: true, length: 40 })
    doorname: string;


}
