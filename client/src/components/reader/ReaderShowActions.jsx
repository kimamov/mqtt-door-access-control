import * as React from 'react';
import {
    TopToolbar,
    Button,
    useNotify,
    useRefresh,
    fetchStart,
    fetchEnd,
    EditButton
} from 'react-admin';
import { useDispatch } from 'react-redux';

const serverAdress=process.env.REACT_APP_SERVER || "http://locaholst:5000";


const ReaderShowActions = ({ basePath, data, resource }) => {
    const notify=useNotify();
    const refresh=useRefresh();
    const dispatch=useDispatch();
    
    const openDoor=async(port)=>{
        try {
            const response=await fetch(`${serverAdress}/opendoor/${data.id}?port=${port}`)
            const json=await response.json();
            notify(`door ${data.id} opened port ${port}`, "info")
        } catch (error) {
            console.log(error)
            notify("could not open door", "error")

        }
    }

    const deleteAllKeys=async()=>{
        try {
            dispatch(fetchStart());
            notify("started deleting all keys this could take around 5 seconds", "info");
            const response=await fetch(`${serverAdress}/deleteall/${data.id}`)
            const json=await response.json();
            dispatch(fetchEnd());
            notify(json.message? json.message :`reader ${data.id} deleted all keys. Reader keys will be refreshed shortly`, "info")
            setTimeout(refresh, 1000);
        } catch (error) {
            dispatch(fetchEnd());
            console.log(error)
            notify(`could not delete keys on reader ${data.id}`, "error")

        }
    }

    const syncAllKeys=async()=>{
        try {
            dispatch(fetchStart());
            notify("started syncing please wait", "info")
            const response=await fetch(`${serverAdress}/syncall/${data.id}`)
            const json=await response.json();
            dispatch(fetchEnd());
            notify(json.message? json.message :`reader ${data.id} synced all keys`, "info")
        } catch (error) {
            dispatch(fetchEnd());
            console.log(error)
            notify(`failed to sync to reader ${data.id}`, "error")

        }
    }

    

    const marginLeft={marginLeft: "8px"}

    return(
        <TopToolbar >
            <EditButton basePath={basePath} record={data}/>
            <Button style={marginLeft} label="OPEN 1" color="primary" variant="contained" onClick={()=>openDoor(1)}/>
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