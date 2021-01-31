// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField, EditButton, Filter, TextInput} from 'react-admin';
import KeyActions from "./KeyActions";

const KeyFilters = (props) => (
    <Filter {...props}>
        <TextInput label="Name" source="name" alwaysOn/>
    </Filter>
);

export const KeyList = (props) => (
    <List 
        actions={<KeyActions/>} 
        filters={<KeyFilters/>}
        {...props} 
    >
        <Datagrid rowClick="show">
            <TextField source="name"/>
            <TextField source="uid" />
            <DateField source="validUntil" showTime locales="de"/>
            <BooleanField source="isOneTimeCode" />
            <EditButton/>
        </Datagrid>
    </List>
);






export default KeyList