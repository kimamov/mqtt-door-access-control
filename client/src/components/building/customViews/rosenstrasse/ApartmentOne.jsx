import { Box } from '@material-ui/core'
import React from 'react'
import LockCell from '../../../dashboard/LockCell'

const ApartmentOne = (props) => {
    /*  */
    return (
        <Box bgcolor="red" display="flex" margin={2}>
            <Box id="links" display="flex" flexDirection="column">
                <LockCell/>
                <LockCell/>
            </Box>
            <Box id="eingang" bgcolor="blue" padding={2} flexDirection="column">
                Eingang
            </Box>
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
