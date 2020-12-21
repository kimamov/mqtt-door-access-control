import * as React from "react";
import { List, Datagrid, TextField, DateField } from 'react-admin';




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