// in src/comments.js
import * as React from 'react';
import { useListContext, List, TextField, DateField, ShowButton, Button, useNotify } from 'react-admin';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';
import IconEvent from '@material-ui/icons/Event';


const cardStyle = {
    width: 300,
    minHeight: 250,
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};


function ShowTimePassed({date}){
    const parsedDate=new Date(date)
    const oldDate=parsedDate instanceof Date? parsedDate : new Date();
    const currenDate=new Date();
    const difference=new Date(Math.abs(currenDate - oldDate)).getTime() / 1000;

    return <div>{Math.round(difference)} seconds ago</div>
}

const ReaderGrid = () => {
    const { ids, data/* , basePath */ } = useListContext();
    const notify=useNotify();
    
    const openDoor=async(id)=>{
        try {
            const response=await fetch(`http://localhost:5000/opendoor/${id}`)
            const json=await response.json();
            notify("door opened", "info")
            console.log(json);
        } catch (error) {
            console.log(error)
            notify("could not open door", "error")

        }
    }

    return (
        <div style={{ margin: '1em' }}>
        {ids.map(id =>
            <Card key={id} style={cardStyle}>
                <CardHeader
                    title={<TextField record={data[id]} source="readerName" />}
                    subheader={<TextField record={data[id]} source="ip"/>}
                    /* avatar={<Avatar icon={<PersonIcon />} />} */
                />
                <CardContent>
                    <DateField record={data[id]} source="lastPing" showTime locales="de"/>
                    <ShowTimePassed date={data[id].lastPing}/>
                </CardContent>
                <CardActions style={{ textAlign: 'right' }}>
                    <Button
                        onClick={() => openDoor(id)}
                        label="open"
                        variant="contained"
                    >
                        <IconEvent />
                    </Button>
                    <ShowButton label="SHOW" record={data[id]} variant="contained" basePath="reader"/>
                </CardActions>
            </Card>
        )}
        </div>
    );
};

export const ReaderList = (props) => (
    <List title="All Readers" {...props}>
        <ReaderGrid />
    </List>
);

export default ReaderList