import * as React from "react";
import { List, Datagrid, Edit, Create, SimpleForm, TextField, DateField, TextInput, DateInput, NumberField, BooleanField } from 'react-admin';


const ReaderListOld = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="ip" />
            <TextField source="readerName" />
            <DateField source="lastPing" showTime locales="de"/>
        </Datagrid>
    </List>
);

const ReaderList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="ip" />
            <TextField source="readerName" />
            <DateField source="lastPing" showTime locales="de"/>
        </Datagrid>
    </List>
);

export default ReaderList