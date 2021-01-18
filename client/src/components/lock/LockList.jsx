// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, NumberField, ReferenceField} from 'react-admin';
import KeyActions from "./KeyActions";

export const LockList = (props) => (
    <List 
        actions={<KeyActions/>} 
        {...props} 
    >
        <Datagrid rowClick="show">
            <TextField source="name"/>
            <TextField source="type" />
            <NumberField source="slot"/>
            <ReferenceField label="Building" reference="building" source="buildingId" link="show">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Reader" reference="reader" source="readerId"  link="show">
                <TextField source="readerName"/>
            </ReferenceField>
            <EditButton/>
        </Datagrid>
    </List>
);





export default LockList