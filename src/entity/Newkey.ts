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

    /* @Column("bigint", { default: Date.now() + 2000 })
    validUntil: number */

    /* @Column("bool", { default: false, nullable: false })
    isOneTimeCode: boolean */

    /* @Column("integer", { default: 1 })
    acctype: number

    @Column("integer", { default: 0 })
    acctype2: number

    @Column("integer", { default: 0 })
    acctype3: number

    @Column("integer", { default: 0 })
    acctype4: number */



}
