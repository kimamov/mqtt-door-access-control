import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator, NumberInput } from 'react-admin';
import { DisabledNumberInput, DisabledTextInput } from '../customFields/DisabledInput';



const ReaderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput label="reader name" source="readerName" disabled/>
            <TextInput source="ip" label="reader IP" disabled />
            <TextInput source="acctypeName" label="acctype opens?" />
            <TextInput source="acctype2Name" label="acctype2 opens?" />
            <TextInput source="acctype3Name" label="acctype3 opens?" />
            <TextInput source="acctype4Name" label="acctype4 opens?" />
            
            <ArrayInput source="readerKeys">
                <SimpleFormIterator disableAdd>
                    <DisabledTextInput label="key name" source="key.name"/>
                    <DisabledNumberInput label="UID" source="key.uid"/>
                    <NumberInput disabled={true} label="acctype" source="acctype" />
                    <NumberInput label="acctype2" source="acctype2"/>
                    <NumberInput label="acctype3" source="acctype3"/>
                    <NumberInput label="acctype4" source="acctype4"/>
                </SimpleFormIterator>
            </ArrayInput>
            
        </SimpleForm>
    </Edit>
);


export default ReaderEdit