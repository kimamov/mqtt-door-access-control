import React from 'react'
import { Show, SimpleShowLayout, NumberField, TextField, ReferenceField, ReferenceManyField, Datagrid } from 'react-admin';





const CameraShow = (props) => {
    return (
        <Show title=" "  {...props}>
            <SimpleShowLayout {...props}>
                <TextField source="name" />
                <TextField source="path" />
                <TextField source="description" />
                <TextField source="type" />
                <TextField source="username" />
                <TextField source="password" />
            </SimpleShowLayout>
        </Show>
    )
}

export default CameraShow
