import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, DateField, TextInput, DateInput, NumberField, BooleanField } from 'react-admin';


/* @Column("varchar", { length: 20, nullable: false })
    type: string;

    @Column("varchar", { nullable: false, length: 20 })
    src: string;

    @Column("varchar", { nullable: true, length: 40 })
    description: string;

    @Column("varchar", { nullable: false, length: 20 })
    data: string;

    @Column("timestamp")
    time: Date;

    @Column("varchar", { nullable: false, length: 20 })
    door: string; */


export const EventList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="door" />
            <TextField source="type" />
            <TextField source="src" />
            <TextField source="description" />
            <TextField source="data" />
            <DateField source="time" showTime locales="de"/>
        </Datagrid>
    </List>
);

export default EventList