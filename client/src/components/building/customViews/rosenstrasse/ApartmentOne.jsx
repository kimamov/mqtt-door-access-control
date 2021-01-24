import { Box } from '@material-ui/core'
import React from 'react'
import LockCell from '../../../dashboard/LockCell'

const ApartmentOne = (props) => {
    /*  */
    return (
        <Box display="flex" margin={2}>
            <Box id="links" display="flex" flexDirection="column">
                <LockCell/>
                <LockCell/>
            </Box>
            <LockCell/>
            <Box id="rechts" display="flex" justifyContent="stretch" flexDirection="column">
            <LockCell/>
                <LockCell/>
                <LockCell/>
                <LockCell/>
            </Box>
        </Box>
    )
}

export default ApartmentOne
