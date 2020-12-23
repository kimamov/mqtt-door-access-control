import { Edit, SimpleForm, TextInput, ArrayInput, SimpleFormIterator } from 'react-admin';



const ReaderEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled label="reader name" source="readerName" />
            <TextInput source="ip" label="reader IP" disabled />
            
            <ArrayInput source="keys">
                <SimpleFormIterator disableAdd>
                    <TextInput source="uid" disabled/>
                    <TextInput source="name" disabled/>
                </SimpleFormIterator>
            </ArrayInput>
            
        </SimpleForm>
    </Edit>
);


export default ReaderEdit