import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true })
    username: string;

    @Column("varchar")
    password: string;

    @Column("int", { default: 0 })
    type: number;

    @BeforeInsert()
    async function() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
