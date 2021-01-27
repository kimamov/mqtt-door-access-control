import { Box, Typography } from '@material-ui/core'
import React from 'react'
import LockCell from '../../../dashboard/LockCell'

const LockOrNull=({lock})=>lock? <LockCell lock={lock}/> : null;

const ApartmentOne = ({apartment={}, props}) => {
    // sort locks by their slot on the reader
    const sortedLocks=apartment.locks && apartment.locks.length
        ? apartment.locks.sort((lockA, lockB)=>lockA.slot-lockB.slot)
        : []
    console.log(sortedLocks)

    return (
        <Box marginX="auto">
            <Typography align="center" variant="h6">{apartment.name}</Typography>
            <Box display="flex" margin={2}>
                <Box id="links" display="flex" flexDirection="column">
                    <LockCell lock={sortedLocks[1]}/>
                    <LockCell lock={sortedLocks[2]}/>
                </Box>
                <LockCell lock={apartment.apartmentLock }/>
                <Box id="rechts" display="flex" justifyContent="stretch" flexDirection="column">
                    <LockCell lock={sortedLocks[3]}/>
                    <LockCell lock={sortedLocks[4]}/>
                    <LockCell lock={sortedLocks[5]}/>
                    <LockCell lock={sortedLocks[6]}/>
                </Box>
            </Box>
        </Box>
        
    )
}

export default ApartmentOne
