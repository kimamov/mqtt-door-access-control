import React from "react";
import { List, Datagrid, TextField, DateField} from 'react-admin';

/* 
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
*/


export const NewKeyList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="uid" />
            <TextField source="door" />
            <TextField source="name" />
            <DateField source="time" showTime locales="de"/>
        </Datagrid>
    </List>
);


