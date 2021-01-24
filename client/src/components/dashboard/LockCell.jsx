import React from 'react'
import Box from '@material-ui/core/Box'
import { styled } from '@material-ui/core';

const Cell=styled(Box)({
    margin: "1px",
    transition: "0.2s",
    cursor: "pointer",
    boxSizing: "border-box",
    border: "2px solid rgba(100,100,100,0.4)",
    borderRadius: "4px",
    overflow: "hidden",
    '&:hover': {
        transform: "scale(1.04)"
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
