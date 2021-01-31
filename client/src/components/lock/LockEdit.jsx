import React from 'react'
import { Edit, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, FormDataConsumer } from 'react-admin';

const LockEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" required/>
            <SelectInput source="type" choices={[
                { id: 'Tresorschloss', name: 'Tresorschloss' },
                { id: 'Wohnungsschloss', name: 'Wohnungsschloss' },
                { id: 'Gebäudeschloss', name: 'Gebäudeschloss' },
            ]} required/>
            <NumberInput source="number" />

            <NumberInput label="Slot (1-6)" source="slot" min={1} max={6} required/>

            <ReferenceInput reference="building" source="buildingId"  allowEmpty {...props}>
                <SelectInput optionText="name" />
            </ReferenceInput>
            <FormDataConsumer>
            {({ formData, ...rest }) => (
                formData.type!=="Gebäudeschloss" && // if the lock is of type Gebäudeschloss dont show this
                <ReferenceInput 
                    reference="apartment" 
                    source="apartmentId"  
                    allowEmpty 
                    filter={formData.buildingId? {buildingId: formData.buildingId}: {}}
                    {...props}
                    {...rest}
                >
                    <SelectInput optionText="name" />
                </ReferenceInput>
                
            )}
            </FormDataConsumer>

            <FormDataConsumer>
            {({ formData, ...rest }) => (
                <ReferenceInput 
                    label={"connected to Controller"}
                    reference="reader" 
                    source="readerId"  
                    allowEmpty
                    filter={formData.apartmentId? {apartmentId: formData.apartmentId}: {}}
                    {...props}
                    {...rest} 
                >
                    <SelectInput optionText="readerName" />
                </ReferenceInput>
                
            )}
            </FormDataConsumer>
            
        </SimpleForm>
    </Edit>
);

export default LockEdit
