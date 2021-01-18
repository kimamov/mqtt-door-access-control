import React from 'react'
import {Edit, SimpleForm, TextInput, DateInput, BooleanInput} from 'react-admin'

const KeyEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="uid" disabled />
            <TextInput source="name" />
            <DateInput label="valid until" source="validUntil" showTime locales="de" />
            <BooleanInput source="isOneTimeCode" />
        </SimpleForm>
    </Edit>
);

export default KeyEdit
