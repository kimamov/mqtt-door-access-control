// in posts.js
import * as React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, DateTimeInput, ReferenceInput, SelectInput } from 'react-admin';





const KeyCreate = (props) => (
    <Create title="Create a Post"  {...props} >
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="uid" />
            <DateTimeInput source="validUntil" showTime locales="de" />
            <BooleanInput source="isOneTimeCode" />
            <ReferenceInput reference="newkey" source="newkey_id"  allowEmpty {...props}>
                <SelectInput optionText="uid" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default KeyCreate