// in src/comments.js
import * as React from 'react';
import { useListContext, List, TextField, DateField, ShowButton, EditButton } from 'react-admin';
import { Card, CardActions, CardContent, CardHeader } from '@material-ui/core';


const cardStyle = {
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const gridStyle ={
    margin: "1em",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))"
}


function ShowTimePassed({date}){
    const parsedDate=new Date(date)
    const oldDate=parsedDate instanceof Date? parsedDate : new Date();
    const currenDate=new Date();
    const difference=new Date(Math.abs(currenDate - oldDate)).getTime() / 1000;

    return <div>{Math.round(difference)} seconds ago</div>
}

const ReaderGrid = () => {
    const { ids, data/* , basePath */ } = useListContext();
    

    return (
        <div style={gridStyle}>
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
                    <ShowButton label="SHOW" record={data[id]} variant="contained" basePath="reader"/>
                    <EditButton label="EDIT" record={data[id]} variant="contained" basePath="reader"/>
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