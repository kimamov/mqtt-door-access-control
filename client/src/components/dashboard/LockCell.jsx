import React from 'react'
import Box from '@material-ui/core/Box'
import { styled } from '@material-ui/core';

const Cell=styled(Box)({
    transition: "0.2s",
    cursor: "pointer",
    '&:hover': {
        transform: "scale(1.08)"
    }
})

const LockCell = ({
    lock={}, 
    style={}, 
    colors={
        open: "green",
        closed: "red",
        taken: "orange",
        free: "grey"
    },
    onClick, 
    ...props}
    ) => {
    const lockNumber=props.lockNumber || 0;
    return (
        <Cell 
            padding={2} 
            border="1px solid black"
            bgcolor={lock.open? colors.open : colors.closed} 
            flex={1}
            style={style}
            onClick={onClick}
        >
            {lockNumber}
        </Cell>
    )
}

export default LockCell
