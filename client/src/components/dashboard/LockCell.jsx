import React, {useState, useRef} from 'react'
import Box from '@material-ui/core/Box'
import { styled } from '@material-ui/core';
import {Add} from '@material-ui/icons';
import {useRedirect, useNotify} from 'react-admin'


const Cell=styled(Box)({
    margin: "1px",
    transition: "0.2s",
    cursor: "pointer",
    boxSizing: "border-box",
    border: "2px solid rgba(100,100,100,0.4)",
    borderRadius: "4px",
    overflow: "hidden",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    '&:hover': {
        transform: "scale(1.04)"
    }
})

const LockCell = (props) => props.lock? <ValidLockCell {...props} /> : <EmptyLockCell/>


const ValidLockCell=({
    lock,
    customLabel, 
    style={}, 
    colors={
        open: "green",
        closed: "red",
        taken: "orange",
        free: "grey"
    },
    onClick, 
    ...props
})=>{
    const notify=useNotify();
    const [menuOpen, setOpen]=useState(false);


    const openLock=async()=>{
        try {
            notify(`started opening lock ${lock.name}`, "info")
            const res=await fetch(`${"http://localhost:5000/api"}/opendoor/${lock.readerId}?port=${lock.slot}`)
            //const json=await res.json();
            notify(`successfully opened lock ${lock.name}`, "info")
        } catch (error) {
            notify(`could not open lock ${lock.name}`, "warning")
            console.log(error)
        }
    }

    const label=customLabel || lock.number || lock.name

    return (
        <Cell 
            padding={2} 
            bgcolor={lock.open? colors.open : colors.closed} 
            flex={1}
            style={style}
            onClick={openLock}
        >
            {label}
        </Cell>
    )
}

const EmptyLockCell=()=>{
    const redirect=useRedirect();

    return (
        <Cell 
            padding={2} 
            bgcolor={"lightgrey"} 
            flex={1}
            onClick={()=>redirect(`/lock/create`)}
        >
            <Add/>
        </Cell> 
    )
}

export default LockCell
