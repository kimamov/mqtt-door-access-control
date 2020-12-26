import React from 'react'
import FormLabel from '@material-ui/core/FormLabel';
import { Button } from 'react-admin'

const TextButtonField = ({source, record={}, children, onClick, label, ...restButtonProps}) => {
    const buttonLabel=record[source] || ""
    if(buttonLabel) return (
        <div style={{padding: "8px 0 4px 0"}}> 
            {label && <FormLabel>{label}</FormLabel>}
            <div style={{padding: "8px 0 4px 0"}}>
                <Button  label={buttonLabel} onClick={onClick} {...restButtonProps} >
                    {children}
                </Button>
            </div>
        </div>
        
    )
    return null
}

export default TextButtonField
