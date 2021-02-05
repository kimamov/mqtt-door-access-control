import { Box } from '@material-ui/core'
import React from 'react'
import LockCell from '../../../dashboard/LockCell'


const ApartmentOne = ({apartment={}, props}) => {
    // sort locks by their slot on the reader
    const sortedLocks=apartment.locks && apartment.locks.length
        ? apartment.locks.sort((lockA, lockB)=>lockA.slot-lockB.slot)
        : []

    /* const halfIndex=Math.floor(sortedLocks.length / 2);
    const arrayFirstHalf=sortedLocks.slice(0, halfIndex);
    const arraySecondHalf=sortedLocks.slice(halfIndex, sortedLocks.length); */

    return (
        <Box marginX="auto">
            {/* <Typography align="center" variant="h6">{apartment.name}</Typography> */}
            <Box margin={2} display="flex" flexDirection="column">
                <LockCell 
                    customLabel={apartment?.apartmentLock?.name} 
                    lock={apartment.apartmentLock}
                />
                <Box display="flex" flex={1}>
                    <Box id="links" display="flex" flexDirection="column" flex={1}>
                        <LockCell lock={sortedLocks[0]}/>
                        <LockCell lock={sortedLocks[1]}/>
                        <LockCell lock={sortedLocks[2]}/>
                    </Box>
                    <Box id="rechts" display="flex" flexDirection="column" flex={1}>
                        <LockCell lock={sortedLocks[3]}/>
                        <LockCell lock={sortedLocks[4]}/>
                        <LockCell lock={sortedLocks[5]}/>
                    </Box>
                </Box>
            </Box>
        </Box>
        
    )
}

export default ApartmentOne
