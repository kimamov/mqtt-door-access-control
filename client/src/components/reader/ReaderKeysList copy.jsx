import React, {useState, useEffect} from 'react'
import { Error, Loading, TextField, DateField, BooleanField, Datagrid, useNotify, ArrayField, useGetList } from 'react-admin'

const ReaderKeysList = ({readerId, ...props}) => {
    const notify=useNotify();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    /* useEffect(async() => {
        notify("Started fetching keys from the reader. This could take a while...", "info")
        try {
            const res=await fetch(`http://localhost:5000/readerkey/${readerId}`);
            const jsonData=await res.json();

            if(!jsonData || !Array.isArray(jsonData.keys)){
                throw Error("unexpected response was returned... could not find array keys")
            }
            setError(null);
            setData({data: jsonData.keys});
            setLoading(false);
        } catch (error) {
            console.log(error)
            setError(error);
            setLoading(false);
        }
        
    }, [readerId]); */
    
    if(loading) return <Loading/>
    if(error) return "could not get keys from reader"
   
    return (
        <ArrayField label="KEYS ON READER" record={data} {...props}>
            <Datagrid>
                <TextField source="name" />
                <TextField source="uid" />
                <DateField source="validUntil" showTime locales="de"/>
                <BooleanField source="isOneTimeCode" />
            </Datagrid>
        </ArrayField>
    )
    
}

export default ReaderKeysList
