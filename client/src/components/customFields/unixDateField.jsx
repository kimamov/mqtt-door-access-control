import React from 'react'

const DateField = (props) => {
    console.log(props)
    if (!props.record) {
        return null;
    }
    const value = props.record[props.source];
    const date = value instanceof Date ? value : new Date(value * 1000);
    return (
        <p>
            {date.toLocaleDateString('de')}
        </p>
    )
}

export default DateField


