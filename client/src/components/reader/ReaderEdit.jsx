import * as React from 'react';
import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, NumberInput, ReferenceInput, SelectInput } from 'react-admin';
import { DisabledNumberInput, DisabledTextInput } from '../customFields/DisabledInput';



const ReaderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput label="reader name" source="readerName" disabled/>
            <TextInput source="ip" label="reader IP" disabled />
            <ReferenceInput 
                reference="apartment" 
                source="apartmentId"  
                allowEmpty 
                {...props}
            >
                <SelectInput optionText="name" />
            </ReferenceInput>
            <TextInput source="acctypeName" label="acctype opens?" />
            <TextInput source="acctype2Name" label="acctype2 opens?" />
            <TextInput source="acctype3Name" label="acctype3 opens?" />
            <TextInput source="acctype4Name" label="acctype4 opens?" />
            <TextInput source="acctype5Name" label="acctype5 opens?" />
            <TextInput source="acctype6Name" label="acctype6 opens?" />
            
            <ArrayInput source="readerKeys">
                <SimpleFormIterator disableAdd>
                    <DisabledTextInput label="key name" source="key.name"/>
                    <DisabledNumberInput label="UID" source="key.uid"/>
                    <NumberInput label="acctype" source="acctype" />
                    <NumberInput label="acctype2" source="acctype2"/>
                    <NumberInput label="acctype3" source="acctype3"/>
                    <NumberInput label="acctype4" source="acctype4"/>
                    <NumberInput label="acctype5" source="acctype5"/>
                    <NumberInput label="acctype6" source="acctype6"/>
                </SimpleFormIterator>
            </ArrayInput>
            
        </SimpleForm>
    </Edit>
);


export default ReaderEdit