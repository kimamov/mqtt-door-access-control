// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton} from 'react-admin';
import KeyActions from "./KeyActions";

export const BuildingList = (props) => (
    <List 
        actions={<KeyActions/>} 
        {...props} 
    >
        <Datagrid rowClick="show">
            <TextField source="name"/>
            <EditButton/>
        </Datagrid>
    </List>
);





export default BuildingList