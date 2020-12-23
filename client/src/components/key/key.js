// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, NumberField, DateField, BooleanField, EditButton, ShowButton } from 'react-admin';
import KeyActions from "./KeyActions";

export const KeyList = (props) => (
    <List 
        actions={<KeyActions/>} 
        {...props} 
    >
        <Datagrid>
            <TextField source="name"/>
            <TextField source="uid" />
            <NumberField source="acctype" />
            <NumberField source="acctype2" />
            <NumberField source="acctype3" />
            <NumberField source="acctype4" />
            <DateField source="validUntil" showTime locales="de"/>
            <BooleanField source="isOneTimeCode" />
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);

export const PostTitle = ({ record }) => {
    return <span>Post {record ? `"${record.title}"` : ''}</span>;
};



export default KeyList