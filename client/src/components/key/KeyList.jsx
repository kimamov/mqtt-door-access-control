// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, DateField, BooleanField, EditButton} from 'react-admin';
import KeyActions from "./KeyActions";

export const KeyList = (props) => (
    <List 
        actions={<KeyActions/>} 
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

export const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};



export default KeyList