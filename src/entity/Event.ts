import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false })
    type: string;

    @Column("varchar", { nullable: false, length: 20 })
    src: string;

    @Column("varchar", { nullable: true, length: 40 })
    description: string;

    @Column("varchar", { nullable: false, length: 20 })
    data: string;

    @Column("varchar", { nullable: false, length: 20 })
    time: string;

    @Column("varchar", { nullable: false, length: 20 })
    door: string;
}
