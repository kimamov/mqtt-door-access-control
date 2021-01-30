import React, {useState, useRef} from 'react'
import Box from '@material-ui/core/Box'
import { styled, Menu, MenuItem } from '@material-ui/core';
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
    const redirect=useRedirect();
    const notify=useNotify();
    //const [menuOpen, setOpen]=useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open=!!anchorEl;


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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

    const redirectToLock=()=>redirect(`/lock/${lock.id}`)

    const label=customLabel || lock.number || lock.name

    return (
        <>
            <Cell 
                padding={2} 
                bgcolor={lock.open? colors.open : colors.closed} 
                flex={1}
                style={style}
                onClick={handleMenu}
            >
                {label}
            </Cell>
            <Menu
                id="menu-appbar"
                //getContentAnchorEl={null}
                //elevation={0}
                anchorEl={anchorEl}
                color="default"
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={openLock}>Open</MenuItem>
                <MenuItem onClick={redirectToLock}>Manage</MenuItem>
            </Menu>
           
        </>
       
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
