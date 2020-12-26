import React from 'react'
import {Datagrid,  Show, SimpleShowLayout,  ArrayField, BooleanField,  NumberField, DateField, TextField} from 'react-admin';





const KeyShow = (props) => {
    return (
        <Show title=" "  {...props}>
            <SimpleShowLayout {...props}>
                <TextField source="name"/>
                <TextField source="uid" />
                <NumberField source="acctype" />
                <NumberField source="acctype2" />
                <NumberField source="acctype3" />
                <NumberField source="acctype4" />
                <DateField source="validUntil" showTime locales="de"/>
                <BooleanField source="isOneTimeCode" />
                
                <ArrayField label="KEY IS ON THESE READERS" source="readerKeys" >
                    <Datagrid>
                        <TextField label="name" source="reader.readerName" />
                        <TextField label="local ip" source="reader.ip" />
                        <DateField label="last ping" source="reader.lastPing" showTime locales="de"/>
                    </Datagrid>
                </ArrayField>
            </SimpleShowLayout>
        </Show>
    )
}

export default KeyShow
