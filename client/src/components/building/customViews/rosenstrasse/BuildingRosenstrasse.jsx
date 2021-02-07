import { useState, useEffect } from 'react'
import { Box, Typography } from '@material-ui/core'
import React from 'react'
import ApartmentOne from './ApartmentOne'
import LockCell from '../../../dashboard/LockCell'



const BuildingRosenstrasse = (props) => {
    const [building, setBuilding]=useState({});
    /* get data for building rosenstrasse */
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER}/building/3`)
            .then(data=>data.json())
            .then(json=>setBuilding(json))
            .catch(error=>console.log(error))
        
    }, [])

    console.log(building)
    return (
        <Box display="inline-block">
            <Typography variant="h5">
                Gebäude Rosenstraße
            </Typography>
            {building && building.apartments?
                <Box position="relative" /* bgcolor="blue" */ display="flex" flexDirection="column">
                    <LockCell customLabel="Eingang Rosenstraße" lock={building.buildingLock}/>
                    <Box 
                        display="flex" 
                        flexWrap="wrap"
                        justifyContent="center"
                        border="2px solid grey"
                        borderRadius={4} 
                    >
                        {building?.apartments.map(apartment=><ApartmentOne apartment={apartment}/>)}{/* Apartments */}
                    </Box>
                </Box>
                :
                <Typography>building could not be found</Typography>
            }
            
        </Box>
    )
}

export default BuildingRosenstrasse
