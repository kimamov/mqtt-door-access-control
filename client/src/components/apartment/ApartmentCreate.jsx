// in posts.js
import * as React from "react";
import { Create, SimpleForm, TextInput, BooleanInput, DateTimeInput, ReferenceInput, SelectInput } from 'react-admin';





const ApartmentCreate = (props) => (
    <Create title="Create a Building"  {...props} >
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceInput reference="building" source="buildingId"  allowEmpty {...props}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);

export default ApartmentCreate