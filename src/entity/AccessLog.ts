import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Reader } from "./Reader";

/* 
msg.topic = "INSERT INTO accesslog (uid, type, isknown, username,door,time) VALUES ('" + msg.payload.uid + "','" + msg.payload.type + "'," + msg.payload.isKnown + ",'" + msg.payload.username + "','" + msg.payload.door + "','" + msg.payload.time + "')";
 */
@Entity()
export class AccessLog {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar")
    uid: string;

    @Column("varchar")
    name: string;

    @Column("bool")
    isKnown: boolean;

    @Column("varchar")
    door: string;


    

    @Column("varchar", { length: 20, nullable: false })
    type: string;

    @Column("varchar", { length: 20, nullable: false })
    access: string;


    @Column("timestamp")
    time: Date;

    @ManyToOne(()=> Reader, reader=> reader.accessLogs, {cascade: true})
    reader: Reader;


}
