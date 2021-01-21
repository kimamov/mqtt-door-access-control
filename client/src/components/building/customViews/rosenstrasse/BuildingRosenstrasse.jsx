import { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import ApartmentOne from './ApartmentOne'



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
                <Box paddingY={4} paddingX={2} marginX="auto" marginY={0} bgcolor="red" display="inline-block">
                    Haupteingang
                </Box>
                <Box display="flex" justifyContent="space-between" paddingTop={4} bgcolor="orange"> {/* Apartments */}
                    <ApartmentOne />
                    <ApartmentOne />
                    <ApartmentOne />
                </Box>
            </Box>
        </Box>
    )
}

export default BuildingRosenstrasse
