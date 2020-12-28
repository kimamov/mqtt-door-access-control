import React from 'react'
import { Toolbar, SaveButton, Create, SimpleForm, ReferenceInput, SelectInput, Datagrid, Show, SimpleShowLayout, TextField, DateField, ArrayField, BooleanField, ReferenceManyField, NumberField, useNotify, useRefresh, BooleanInput } from 'react-admin';
import { LockOpen} from '@material-ui/icons';
import ReaderShowActions from './ReaderShowActions'
import TextButtonField from '../customFields/TextButtonField';


const KeyEditToolbar = props => (
    <Toolbar {...props} >
        <SaveButton />
    </Toolbar>
);

const ShowPropsExtractor=({children, ...props})=>{
    const notify=useNotify();
    const refresh=useRefresh();
    const {keys=[]}=props.record;


    const openDoor=async(port)=>{
        try {
            const serverAdress=process.env.REACT_APP_SERVER || "http://locaholst:5000";
            const response=await fetch(`${serverAdress}/opendoor/${props.record.id}?port=${port}`)
            await response.json();
            notify(`door ${props.record.id} opened port ${port}`, "info")
        } catch (error) {
            console.log(error)
            notify("could not open door", "error")
        }
    }

    const readerKeyRowStyle = (record, _index) => {
        return {
            backgroundColor: record && keys && keys.find(key=>{
                return ( 
                    key.uid === record.uid && 
                    key.name === record.name &&
                    key.acctype === record.acctype &&
                    key.acctype2 === record.acctype2 &&
                    key.acctype3 === record.acctype3 &&
                    key.acctype4 === record.acctype4 ) // add back valid until later 
            }) ? '#efe' : 'white',
        }
    }

    const onSuccess = () => {
        notify(`successfully added key to reader`)
        refresh();
    };

    return (
        <SimpleShowLayout {...props}>
            <TextField source="readerName" />
            <TextField source="ip" />
            <DateField source="lastPing" showTime locales="de"/>
            <TextButtonField onClick={()=>openDoor(1)} label="Relay 1 (acctype)" variant="contained" source="acctypeName">
                <LockOpen/>
            </TextButtonField>
            <TextButtonField onClick={()=>openDoor(2)} label="Relay 2 (acctype2)" variant="contained" source="acctype2Name">
                <LockOpen/>
            </TextButtonField>
            <TextButtonField onClick={()=>openDoor(3)} variant="Relay 3 (acctype3)" variant="contained" source="acctype3Name">
                <LockOpen/>
            </TextButtonField>
            <TextButtonField onClick={()=>openDoor(4)} variant="Relay 4 (acctype4)" variant="contained" source="acctype4Name">
                <LockOpen/>
            </TextButtonField>
            
            <Create title=" " resource={props.resource} onSuccess={onSuccess}>
                <SimpleForm toolbar={<KeyEditToolbar/>}>
                    <ReferenceInput label="ADD KEY TO READER" reference="key" source="key_id"  required>
                        <SelectInput optionText="name" />
                    </ReferenceInput>
                    <BooleanInput label="acctype"  source="acctype"/>
                    <BooleanInput label="acctype2" source="acctype2"/>
                    <BooleanInput label="acctype3" source="acctype3"/>
                    <BooleanInput label="acctype4" source="acctype4"/>
                </SimpleForm>
            </Create>

            {/*TODO: make this a referencefield too after creating the route  */}
            <ArrayField label="KEYS IN THE DB" source="readerKeys" >
                <Datagrid>
                    <TextField label="name" source="key.name" />
                    <TextField label="UID" source="key.uid" />
                    <DateField label="valid" source="key.validUntil" showTime locales="de"/>
                    <BooleanField label="one time" source="key.isOneTimeCode" />
                    <NumberField source="acctype"  />
                    <NumberField source="acctype2" />
                    <NumberField source="acctype3" />
                    <NumberField source="acctype4" />
                </Datagrid>
            </ArrayField>

            <ReferenceManyField reference="devicekey" target="readerId" label="KEYS ON READER" {...props}>
                <Datagrid rowStyle={readerKeyRowStyle} {...props}>
                    <TextField source="name" />
                    <TextField source="uid" />
                    <DateField source="validUntil" showTime locales="de"/>
                    <NumberField source="acctype" />
                    <NumberField source="acctype2" />
                    <NumberField source="acctype3" />
                    <NumberField source="acctype4" />
                </Datagrid>
            </ReferenceManyField>
            

        </SimpleShowLayout>
    )
}


const ReaderShow = (props) => {
    return (
        <Show  actions={<ReaderShowActions/>}  {...props}>
            <ShowPropsExtractor/>
        </Show>
    )
}

export default ReaderShow
