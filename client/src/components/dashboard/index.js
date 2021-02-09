import { Card, CardContent, CardHeader } from '@material-ui/core'
import React from 'react'
import BuildingRosenstrasse from '../building/customViews/rosenstrasse/BuildingRosenstrasse'
import CameraView from '../camera/CameraView'

const Dashboard = (props) => {
    console.log(props)
    return (
        <Card>
            <CardHeader title="Dashboard"/>
            <CardContent>
                <CameraView/>
                <BuildingRosenstrasse/>
            </CardContent>
        </Card>
    )
}

export default Dashboard