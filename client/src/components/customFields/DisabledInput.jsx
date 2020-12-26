import React from 'react'
import { TextInput, NumberInput } from 'react-admin'

/* why is this nonsense needed?
it looks like SimpleFormIterator forcefully injects its disabled prop to all its children
overwritting the value set on them so you can only disable all inputs or one */

export const DisabledTextInput = ({disabled, ...props}) => {
    return <TextInput disabled={true} {...props}/>
}

export const DisabledNumberInput = ({disabled, ...props}) => {
    return <NumberInput disabled={true} {...props}/>
}

const out= { DisabledTextInput, DisabledNumberInput }
export default out