// in posts.js
import * as React from "react";
import { List, Datagrid, TextField, EditButton, ReferenceField} from 'react-admin';

export const ApartmentList = (props) => (
    <List 
        {...props} 
    >
        <Datagrid rowClick="show">
            <TextField source="name"/>
            <ReferenceField label="Building" reference="building" source="buildingId" link="show">
                <TextField source="name"/>
            </ReferenceField>
            <ReferenceField label="Aparment Lock" reference="lock" source="apartmentLockId" link="show">
                <TextField source="name"/>
            </ReferenceField>
            <EditButton/>
        </Datagrid>
    </List>
);





export default ApartmentList