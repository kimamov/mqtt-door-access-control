import React from 'react'
import { Toolbar, SaveButton, Create, SimpleForm, ReferenceInput, SelectInput, Datagrid, Show, SimpleShowLayout, TextField, DateField, ArrayField, BooleanField, CreateActions} from 'react-admin';

const KeyEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);


const ReaderShow = (props) => {
    return (
        <Show title=" "  {...props}>
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
                <ArrayField source="readerToKeys">
                    <Datagrid>
                        <TextField source="name" />
                        <TextField source="uid" />
                        <DateField source="validUntil" showTime locales="de"/>
                        <BooleanField source="isOneTimeCode" />
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
}

export default ReaderShow
