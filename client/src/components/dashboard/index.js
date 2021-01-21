import { Card, CardContent, CardHeader, Typography } from '@material-ui/core'
import React from 'react'
import BuildingRosenstrasse from '../building/customViews/rosenstrasse/BuildingRosenstrasse'

const Dashboard = (props) => {
    console.log(props)
    return (
        <Card>
            <CardHeader title="Dashboard"/>
            <CardContent>
                <BuildingRosenstrasse/>
            </CardContent>
        </Card>
    )
}

export default Dashboard