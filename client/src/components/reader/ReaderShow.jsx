import React from 'react'
import { Toolbar, SaveButton, Create, SimpleForm, ReferenceInput, SelectInput, Datagrid, Show, SimpleShowLayout, TextField, DateField, ArrayField, BooleanField, CreateActions, ReferenceArrayField, List, ReferenceField, ReferenceManyField} from 'react-admin';
import ReaderShowActions from './ReaderShowActions'


const KeyEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);


const ReaderShow = (props) => {
    console.log(props)
    return (
        /* maybe make this a tab layout instead  */
        <Show title=" " actions={<ReaderShowActions/>} {...props}>
            <SimpleShowLayout>
                <TextField source="readerName" />
                <TextField source="ip" />
                <DateField source="lastPing" showTime locales="de"/>
                <Create resource={props.resource}>
                    <SimpleForm toolbar={<KeyEditToolbar/>} margin="none">
                        <ReferenceInput reference="key" source="key_id"  allowEmpty>
                            <SelectInput optionText="name" />
                        </ReferenceInput>
                    </SimpleForm>
                </Create>

                <ArrayField label="KEYS IN THE DB" source="keys" >
                    <Datagrid>
                        <TextField source="name" />
                        <TextField source="uid" />
                        <DateField source="validUntil" showTime locales="de"/>
                        <BooleanField source="isOneTimeCode" />
                    </Datagrid>
                </ArrayField>

               <ReferenceManyField reference="readerkey" target="readerId" label="KEYS ON READER" allowEmpty>
                    <Datagrid >
                        <TextField source="name" />
                        <TextField source="uid" />
                        <DateField source="validUntil" showTime locales="de"/>
                        <BooleanField source="isOneTimeCode" />
                    </Datagrid>
                </ReferenceManyField>

            </SimpleShowLayout>
        </Show>
    )
}

export default ReaderShow
