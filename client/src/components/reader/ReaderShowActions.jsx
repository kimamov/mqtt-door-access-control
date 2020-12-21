import * as React from 'react';
import {
    TopToolbar,
    Button,
    useNotify,
    useRefresh
} from 'react-admin';
const serverAdress=process.env.REACT_APP_SERVER || "http://locaholst:5000";


const ReaderShowActions = ({ basePath, data, resource }) => {
    const notify=useNotify();
    const refresh=useRefresh();
    
    const openDoor=async(port)=>{
        try {
            const response=await fetch(`${serverAdress}/opendoor/${data.id}?port=${port}`)
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
            const response=await fetch(`${serverAdress}/deleteall/${data.id}`)
            const json=await response.json();
            notify(json.message? json.message :`reader ${data.id} deleted all keys. Reader keys will be refreshed shortly`, "info")
            setTimeout(refresh, 1000);
        } catch (error) {
            console.log(error)
            notify(`could not delete keys on reader ${data.id}`, "error")

        }
    }

    const syncAllKeys=async()=>{
        try {
            const response=await fetch(`${serverAdress}/syncall/${data.id}`)
            const json=await response.json();
            notify(json.message? json.message :`reader ${data.id} synced all keys`, "info")
            console.log(json);
        } catch (error) {
            console.log(error)
            notify(`failed to sync to reader ${data.id}`, "error")

        }
    }

    /* const getReaderKeys=async()=>{
        try {
            const response=await fetch(`http://localhost:5000/readerkey/${data.id}`)
            const json=await response.json();
            notify(`door ${data.id} synced all keys`, "info")
            console.log(json);
        } catch (error) {
            console.log(error)
            notify(`failed to sync to door ${data.id}`, "error")

        }
    } */

    const marginLeft={marginLeft: "8px"}

    return(
        <TopToolbar >
            <Button label="OPEN 1" color="primary" variant="contained" onClick={()=>openDoor(1)}/>
            <Button style={marginLeft} label="OPEN 2" color="primary" variant="contained" onClick={()=>openDoor(2)}/>
            <Button style={marginLeft} label="OPEN 3" color="primary" variant="contained" onClick={()=>openDoor(3)}/>
            <Button style={marginLeft} label="OPEN 4" color="primary" variant="contained" onClick={()=>openDoor(4)}/>
            {/* <Button style={marginLeft} label="SHOW READER KEYS" color="secondary" variant="contained" onClick={getReaderKeys}/> */}
            <Button style={marginLeft} label="SYNC ALL!" color="secondary" variant="contained" onClick={syncAllKeys}/>
            <Button style={marginLeft} label="DELETE ALL!" color="secondary" variant="contained" onClick={deleteAllKeys}/>
        </TopToolbar>
    )
};

export default ReaderShowActions