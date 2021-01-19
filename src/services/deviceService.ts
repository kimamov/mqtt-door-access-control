import { getRepository } from "typeorm";
import { deleteKey } from "../controllers/keyController";
import { Reader } from "../entity/Reader";
import { ReaderKey } from "../entity/ReaderKey";
import { client } from "../mqtt/connection";
import arrayDifference from "../util/arrayDifference";


export async function updateDeviceKeys(readerId, keys: ReaderKey[]){
    const readerResult = await getRepository(Reader).findOne(readerId, {relations: ["readerKeys", "readerKeys.key"]})

    const addedKeys=arrayDifference(keys, readerResult.readerKeys, (a, b)=>{
        return a?.key?.uid===b?.key?.uid;
    }) // items that are in array 1 but not in 2

    const removedKeys=arrayDifference(readerResult.readerKeys, keys, (a, b)=>{
        return a.keyId===b.keyId;
    }) // items that are in array 2 but not in 1

    console.log(`keys added`)
    console.log(addedKeys);
    console.log("keys removed");
    console.log(removedKeys);


    // delete all keys that were just removed from the DB from the device too
    try {
        await deleteDeviceKeys(readerResult, removedKeys);
    } catch (error) {
        console.log(error)
    }

}

export function deleteDeviceKeys(reader: Reader, keys: ReaderKey[]): Promise<void>{
    return new Promise((resolve, reject)=>{
        
        const deleteUser=(readerKey: ReaderKey)=>{
            if(client.connected && readerKey && readerKey.key){
                client.publish('devnfc', JSON.stringify({
                    cmd: "deletuid",
                    doorip: reader.ip,
                    doorname: reader.readerName,
                    uid: readerKey.key.uid
                }));
            }else {
                cleanupAndReject();
            }
        }
        const cleanup=()=>{
            clearTimeout(mqttTimeout);
            client.off("message", mqttMessageHandler)
    
        }
    
        const cleanupAndResolve=()=>{
            cleanup();
            resolve();
    
        }
        const cleanupAndReject=()=>{
            cleanup();
            reject();
        }

        if(!keys.length){ // if there are no keys just resolve
            resolve();
        }
    
        let mqttTimeout; 
        const mqttMaxResponseTime: number=4000; // give the device max 4 seconds between messages and otherwise return
        
    
        const mqttMessageHandler=(topic: string, message: Buffer)=> {
            if(topic==="devnfc/devicestate" || topic==="/devnfc/devicestate"){
                const messageString = message.toString()
                const messageJSON = JSON.parse(messageString)
                if(messageJSON.deviceName===reader.readerName){ // make sure message comes from the same controller
                    if(messageJSON.cmd==="deleteUserState"){
                        if(keys.length){ // after the delete is comfirmed by the device try to remove the key from the array
                            const keyIndex=keys.findIndex(item=>item.key.uid===messageJSON.deletedUID); // check if array has key with same uid
                            if(keyIndex!==-1){ // if key was found remove it
                                keys.splice(keyIndex, 1);
                                clearTimeout(mqttTimeout); // only after successfully removing a key restart the early return timer
                                mqttTimeout=setTimeout(cleanupAndReject, mqttMaxResponseTime);
                            }

                        }
                        // filtering might have failed to we check again if there are keys left
                        if(keys.length>0){
                            // if there are still keys left to delete send the next request
                            deleteUser(keys[0]);
                        }else {
                            // otherwise we are done
                            cleanupAndResolve();
                        }
                        
                        console.log(messageJSON);
                        
                    }
                    
                }
                
            }
        }
    
        client.on("message", mqttMessageHandler)
    
        deleteUser(keys[0]);

        mqttTimeout=setTimeout(cleanupAndReject, mqttMaxResponseTime)
    })
     
}