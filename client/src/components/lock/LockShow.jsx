import React from 'react'
import {Show, SimpleShowLayout,  NumberField, TextField, ReferenceField, ReferenceManyField, Datagrid} from 'react-admin';





const LockShow = (props) => {
    return (
        <Show title=" "  {...props}>
            <SimpleShowLayout {...props}>
                <TextField source="name"/>
                <TextField source="type" />
                <NumberField source="slot"/>
                <ReferenceField label="Building" reference="building" source="buildingId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label="Apartment" reference="apartment" source="apartmentId" link="show">
                    <TextField source="name"/>
                </ReferenceField>
                <ReferenceField label="Reader" reference="reader" source="readerId"  link="show">
                    <TextField source="readerName"/>
                </ReferenceField>
                
                <ReferenceManyField label="Keys" reference="lockkey" target="id">
                    <Datagrid>
                        <ReferenceField reference="key" source="keyId" link="show">
                            <TextField source="name"/>
                        </ReferenceField>
                    </Datagrid>
                </ReferenceManyField>
            </SimpleShowLayout>
        </Show>
    )
}

export default LockShow
