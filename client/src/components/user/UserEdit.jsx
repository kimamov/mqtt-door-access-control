import React from 'react'
import {Edit, SimpleForm, TextInput, SelectInput} from 'react-admin'

const UserEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="username" />
            <TextInput source="password"/>
            <SelectInput source="type" choices={[
                { id: 'guest', name: 'guest' },
                { id: 'user', name: 'user' },
                { id: 'admin', name: 'admin' },
            ]} />
        </SimpleForm>
    </Edit>
);

export default UserEdit
