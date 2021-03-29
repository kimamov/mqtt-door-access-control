import { Card, CardContent, CardHeader } from '@material-ui/core'
import React from 'react'
import BuildingRosenstrasse from '../building/customViews/rosenstrasse/BuildingRosenstrasse'
import CameraView from '../camera/CameraView'



const Dashboard = () => {
    return (
        <Card>
            <CardHeader title="Dashboard"/>
            <CardContent>
                <CameraView cameraAdress="rtsp://admin:work4me!@mzvol.synology.me:1000/11"/>
                <CameraView cameraAdress="rtsp://admin:meier1234@meierscloud.synology.me:9000/"/>
                <BuildingRosenstrasse/>
            </CardContent>
        </Card>
    )
}

export default Dashboard