import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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

   


}
