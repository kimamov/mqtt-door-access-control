import React, {useState, useEffect} from 'react'
import { Error, Loading, TextField, DateField, BooleanField, Datagrid, useNotify, ArrayField, ListContextProvider } from 'react-admin'

const ReaderKeysList = ({readerId, ...props}) => {
    const notify=useNotify();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(async() => {
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
        
    }, [readerId]);
    
    if(loading) return <Loading/>
    if(error) return "could not get keys from reader"
    /* return (   
        <ListContextProvider value={{
            data: keyBy(data, 'id'),
            ids: data.map(({ id }) => id),
            total,
            page,
            perPage,
            setPage,
            currentSort: { field: 'id', order: 'ASC' },
            basePath: "/posts",
            resource: 'posts',
            selectedIds: []
        }}>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="name" />
            </Datagrid>
            <Pagination />
        </ListContextProvider >
    ) */
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
    /* return (
        <ul>
            {data.keys.map((item, index)=>(
                <li key={`reader_key_${index}`}>
                    <Datagrid>
                        <TextField record={item.name}  />
                        <TextField record={item.uid}  />
                        <DateField record={item.validUntil}  showTime locales="de"/>
                        <BooleanField record={item.isOneTimeCode} />
                    </Datagrid>
                </li>
                
            ))}
        </ul>
    ) */
}

export default ReaderKeysList
