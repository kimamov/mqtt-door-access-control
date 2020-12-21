import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField } from 'react-admin';


/* @PrimaryGeneratedColumn()
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

    @Column("timestamp")
    time: Date; */


export const AccessList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="uid" />
            <TextField source="name" />
            <TextField source="door" />
            <TextField source="type" />
            <TextField source="access" />
            <DateField source="time" showTime locales="de"/>
            <BooleanField source="isKnown" />
        </Datagrid>
    </List>
);

export default AccessList