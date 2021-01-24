// in posts.js
import * as React from "react";
import { Create, SimpleForm, TextInput, NumberInput, ReferenceInput, SelectInput, FormDataConsumer } from 'react-admin';





const LockCreate = (props) => {
    
    return(
        <Create title="Create a Lock"  {...props} >
            <SimpleForm>
                <TextInput source="name" />
                <TextInput source="type" />
                <NumberInput source="slot" min={1} max={6}/>

                <ReferenceInput reference="building" source="buildingId"  allowEmpty {...props}>
                    <SelectInput optionText="name" />
                </ReferenceInput>
                <FormDataConsumer>
                {({ formData, ...rest }) => (
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
        </Create>
)};

export default LockCreate