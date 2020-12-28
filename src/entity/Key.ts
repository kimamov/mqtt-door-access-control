import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { ReaderKey } from "./ReaderKey";
import { User } from "./User";

@Entity()
export class Key {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 20, nullable: false })
    uid: string;

    @Column("varchar", { nullable: false })
    name: string;

    @Column("timestamp", {default: ()=>'CURRENT_TIMESTAMP'})
    validUntil: Date

    @Column("bool", { default: false, nullable: false })
    isOneTimeCode: boolean

    
    @OneToMany(()=>ReaderKey, readerKey=>readerKey.key, {cascade: true})
    readerKeys: ReaderKey[];

    @ManyToOne(()=>User, user=>user.keys)
    user: User;

}
