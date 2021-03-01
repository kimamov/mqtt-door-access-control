import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Camera {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { nullable: false })
    name: string;

    @Column("varchar", { nullable: false })
    path: string;

    @Column("varchar", { nullable: true, length: 100 })
    description: string;

    @Column("varchar", { length: 64, nullable: true })
    type: string;

    @Column("varchar", { nullable: true, length: 100 })
    username: string;

    @Column("varchar", { nullable: true, length: 100 })
    password: string;
}
