import * as React from "react";
import { Create, SimpleForm, TextInput } from 'react-admin';



const UserCreate = (props) => (
    <Create title="Create a User"  {...props} >
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="password" />
        </SimpleForm>
    </Create>
);

export default UserCreate