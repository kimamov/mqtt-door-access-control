import * as React from 'react';
import {
    TopToolbar,
    Button,
    useNotify
} from 'react-admin';

const ReaderShowActions = ({ basePath, data, resource }) => {
    const notify=useNotify();
    
    const openDoor=async(port)=>{
        try {
            const response=await fetch(`http://localhost:5000/opendoor/${data.id}?port=${port}`)
            const json=await response.json();
            notify(`door ${data.id} opened port ${port}`, "info")
            console.log(json);
        } catch (error) {
            console.log(error)
            notify("could not open door", "error")

        }
    }

    const deleteAllKeys=async()=>{
        try {
            const response=await fetch(`http://localhost:5000/deleteall/${data.id}`)
            const json=await response.json();
            notify(`door ${data.id} deleted all keys`, "info")
            console.log(json);
        } catch (error) {
            console.log(error)
            notify(`could not delete keys on door ${data.id}`, "error")

        }
    }

    const syncAllKeys=async()=>{
        try {
            const response=await fetch(`http://localhost:5000/syncall/${data.id}`)
            const json=await response.json();
            notify(`door ${data.id} synced all keys`, "info")
            console.log(json);
        } catch (error) {
            console.log(error)
            notify(`failed to sync to door ${data.id}`, "error")

        }
    }

    const marginLeft={marginLeft: "8px"}

    return(
        <TopToolbar >
            <Button label="OPEN 1" color="primary" variant="contained" onClick={()=>openDoor(1)}/>
            <Button style={marginLeft} label="OPEN 2" color="primary" variant="contained" onClick={()=>openDoor(2)}/>
            <Button style={marginLeft} label="OPEN 3" color="primary" variant="contained" onClick={()=>openDoor(3)}/>
            <Button style={marginLeft} label="OPEN 4" color="primary" variant="contained" onClick={()=>openDoor(4)}/>
            <Button style={marginLeft} label="SYNC ALL!" color="secondary" variant="contained" onClick={()=>syncAllKeys(4)}/>
            <Button style={marginLeft} label="DELETE ALL!" color="secondary" variant="contained" onClick={()=>deleteAllKeys(4)}/>
        </TopToolbar>
    )
};

export default ReaderShowActions