import * as React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, DateTimeInput, ReferenceInput, SelectInput } from 'react-admin';



const UserCreate = (props) => (
    <Create title="Create a User"  {...props} >
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="password" />
        </SimpleForm>
    </Create>
);

export default UserCreate