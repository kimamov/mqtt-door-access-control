// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton} from 'react-admin';

export const ApartmentList = (props) => (
    <List 
        {...props} 
    >
        <Datagrid rowClick="show">
            <TextField source="name"/>
            <EditButton/>
        </Datagrid>
    </List>
);





export default ApartmentList