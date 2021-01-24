import { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import ApartmentOne from './ApartmentOne'
import LockCell from '../../../dashboard/LockCell'



const BuildingRosenstrasse = (props) => {
    const [modalOpen, setOpen]=useState(false);
    const [building, setBuilding]=useState({});
    /* get data for building rosenstrasse */
    useEffect(() => {
        fetch(`http://localhost:5000/api/building/1`)
            .then(data=>data.json())
            .then(json=>setBuilding(json))
            .catch(error=>console.log(error))
        
    }, [])

    console.log(building)
    return (
        <Box display="inline-block">
            <Typography>
                Gebäude Rosenstraße
            </Typography>
            <Box position="relative" /* bgcolor="blue" */ display="flex" flexDirection="column">
                <LockCell/>
                <Box 
                    display="flex" 
                    justifyContent="space-between"
                    border="2px solid grey"
                    borderRadius={4} 
                    /* paddingTop={4} */ 
                > {/* Apartments */}
                    <ApartmentOne />
                    <ApartmentOne />
                    <ApartmentOne />
                </Box>
            </Box>
        </Box>
    )
}

export default BuildingRosenstrasse
