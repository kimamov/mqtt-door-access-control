import * as React from "react";
import { Create, SimpleForm, TextInput } from 'react-admin';





const CameraCreate = (props) => (
    <Create title="Create a Building"  {...props} >
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="path" />
            <TextInput source="description" />
            <TextInput source="type" />
            <TextInput source="username" />
            <TextInput source="password" />
        </SimpleForm>
    </Create>
);

export default CameraCreate