import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";


@Entity()
export class ReaderKeyReader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 30, nullable: true })
    readerIp: string;

    @Column("integer", {nullable: true})
    readerId: number;


    @Column("varchar", { length: 20, nullable: false })
    uid: string;

    @Column("varchar", { nullable: false })
    name: string;

    @Column("timestamp", {default: ()=>'CURRENT_TIMESTAMP'})
    validUntil: Date

    @Column("bool", { default: false, nullable: false })
    isOneTimeCode: boolean

    @Column("integer", { default: 1 })
    acctype: number

    @Column("integer", { default: 0 })
    acctype2: number

    @Column("integer", { default: 0 })
    acctype3: number

    @Column("integer", { default: 0 })
    acctype4: number



}