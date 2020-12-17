import React from 'react'
import { ReferenceInput, SelectInput, Create, SimpleForm } from 'react-admin'

const QuickCreateBox = (props) => {
    return (
        <Create>
            <SimpleForm>
                <ReferenceInput reference="key" source="key_id"  allowEmpty>
                    <SelectInput optionText="name" />
                </ReferenceInput>
            </SimpleForm>
        </Create>
        
        
    )
}

export default QuickCreateBox
