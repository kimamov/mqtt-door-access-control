// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, ReferenceField } from 'react-admin';

export const CameraList = (props) => (
    <List
        {...props}
    >
        <Datagrid rowClick="show">
            <TextField source="name" />
            <TextField source="path" />
            <TextField source="description" />
            <TextField source="type" />
            <TextField source="username" />
            <TextField source="password" />

            <EditButton />
        </Datagrid>
    </List>
);





export default CameraList