import * as React from "react";
import { Create, SimpleForm, TextInput } from 'react-admin';





const BuildingCreate = (props) => (
    <Create title="Create a Building"  {...props} >
        <SimpleForm>
            <TextInput source="name" />

        </SimpleForm>
    </Create>
);

export default BuildingCreate