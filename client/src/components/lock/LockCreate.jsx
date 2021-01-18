// in posts.js
import * as React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, DateTimeInput, ReferenceInput, SelectInput } from 'react-admin';





const LockCreate = (props) => (
    <Create title="Create a Lock"  {...props} >
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="type" />

            <ReferenceInput reference="reader" source="readerId"  allowEmpty {...props}>
                <SelectInput optionText="readerName" />
            </ReferenceInput>
            <ReferenceInput reference="building" source="buildingId"  allowEmpty {...props}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default LockCreate