import * as React from "react";
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';

/* 

@PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { unique: true })
    username: string;

    @Column("varchar")
    password: string;

    @Column("int", { default: 0 })
    type: number;

    @OneToMany(() => Key, key => key.user, {onDelete: "CASCADE"})
    keys: Key[];
*/

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="username" />
            <NumberField source="type" />
        </Datagrid>
    </List>
);

export default UserList