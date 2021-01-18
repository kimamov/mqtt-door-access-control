/* controller to communicate with the microcontroller device */
import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"
import { client } from "../mqtt/connection";
import dateFromUnix from "../util/dateFromUnix";
import wait from "../util/wait";
import dateToUnix from "../util/dateToUnix";
import { readerConfig } from "../config";
import { ReaderKeyReader } from "../entity/ReaderKeyReader";


let gettingKeyList=false;


async function createReaderKey(keyObj){
    try {
        return;
        /* console.log(`keyobject is`)
        console.log(keyObj) */
        const repo: Repository<ReaderKeyReader>=getRepository(ReaderKeyReader);
        const key=await repo.findOne({readerId: keyObj.readerId, uid: keyObj.uid});
        /* console.log(key) */
        if(key){
            // do update
        }else {
            await repo.save(keyObj);
            /* console.log(res) */
        }
    } catch (error) {
        console.log(error)
    }
}

export async function openDoor(req: Request, res: Response){
    // get the door from the DB
    try {
        const id=req.params.id;
        const port=req.query.port? Number(req.query.port) : 1;

        const readerRepository: Repository<Reader> = getRepository(Reader);
        const reader=await readerRepository.findOne(id);
        if(!reader){
            return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
        }
        if(!client.connected){
            res.status(500).send({error: "connection to the MQTT client was lost"})
        }
        client.publish("devnfc", JSON.stringify({
            cmd: "opendoor",
            doorip: reader.ip,
            acctype: port===1? 1 : 0,
            acctype1: port===1? 1 : 0,
            acctype2: port===2? 1 : 0,
            acctype3: port===3? 1 : 0,
            acctype4: port===4? 1 : 0,
            acctype5: port===5? 1 : 0,
            acctype6: port===6? 1 : 0,
        }))
        res.send({message: "succes"})
    } catch (error) {
        res.status(500).send({error: error})
    }
    
}


export async function generateReaderKeys(req: Request, res: Response) {
    // tell the reader to send us all keys that are currently stored on it
    if(gettingKeyList){
        return res.status(500).send({message: "already getting the keylist of another reader"})
    }
    const id=req.params.id;
    const readerRepository: Repository<Reader> = getRepository(Reader);
    const reader=await readerRepository.findOne(id);
    
    if(!reader){
        return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
    }
    if(!client.connected){
        return res.status(500).send({error: "connection to the MQTT client was lost"})
    }
    /* TODO: get the reader from the doorid then use its ip to the command */
    client.publish("devnfc", JSON.stringify({
        /* cmd: "getuser", */
        cmd: "listusr",
        doorip: reader.ip,
    }))

    gettingKeyList=true;
    
    let timeout=null;
    const keys=[];

    
    function messageHandler(topic: string, message: Buffer) {
        // message is Buffer
        try {
            if(topic==="devnfc/send" || topic==="/devnfc/send"){
                const messageString = message.toString()
                const messageJSON = JSON.parse(messageString)
                if(messageJSON.cmd==="adduser"){
                    console.log("received key");
                    console.log(messageJSON);
                    const keyObj={
                        readerIp: reader.ip,
                        readerId: reader.id,
                        uid: messageJSON.uid,
                        name: messageJSON.user,
                        acctype: messageJSON.acctype? 1 : 0,
                        acctype2: messageJSON.acctype2? 1 : 0,
                        acctype3: messageJSON.acctype3? 1 : 0,
                        acctype4: messageJSON.acctype4? 1 : 0,
                        acctype5: messageJSON.acctype5? 1 : 0,
                        acctype6: messageJSON.acctype6? 1 : 0,
                        validUntil: dateFromUnix(messageJSON.validuntil)
                        
                    };
                    //console.log(keyObj)
                    keys.push(keyObj);
                    createReaderKey(keyObj);
                    console.log("timer extended after receiving new key")
                    if(timeout) clearTimeout(timeout); // 
                    timeout=setTimeout(()=>{
                        console.log("last answer was to long ago listener removed")
                        client.off('message', messageHandler);
                        gettingKeyList=false;
                        res.send({
                            readerId: reader.id,
                            keys: keys
                        });
    
                    }, 2000);
                }
            }
                
    
        } catch (error) {
            console.log("error parsing following content as json: " + message.toString())
            console.log(error)
            
        }
    }
    if(!client.connected){
        return res.status(500).send({error: "connection to the MQTT client was lost"})
    }
    timeout=setTimeout(()=>{ // wait 4 seconds for the device to send back users. If non are send there no
        console.log("timed out and listener removed")
        client.off('message', messageHandler);
        gettingKeyList=false;
        return res.status(404).send({
            ip: reader.ip,
            keys: keys,
            message: "looks like there are no keys on the reader"
        });

    }, 4000);

    client.on('message', messageHandler)
}


export async function generateAllReaderKeys(req: Request, res: Response) {
    // tell the reader to send us all keys that are currently stored on it
    if(gettingKeyList){
        return res.status(500).send({message: "already getting the keylist of another reader. try again in a few seconds"})
    }
    try {
        const {readerId}=JSON.parse(req.query.filter as string);
        if(readerId===undefined){
            return res.status(500).send({message: "your filter does not contain a readerId"})
        }
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const reader=await readerRepository.findOne(readerId);
        
        if(!reader){
            return res.status(404).send({message: `could not find reader with the provided id: ${readerId}`})
        }
        
        if(!client.connected){
            return res.status(500).send({error: "connection to the MQTT client was lost"})
        }
        const keyBatchLength=3;
        /* TODO: get the reader from the doorid then use its ip to the command */
        client.publish("devnfc", JSON.stringify({
            cmd: "listusr",
            doorip: reader.ip,
            skip: 0,
            take: keyBatchLength  // get the first 3 keys on the controller
        }))

        gettingKeyList=true;
        
        let timeout=null;
        const keys=[];

        const sendResponse=()=>{ 
            console.log("last answer was to long ago listener removed")
            client.off('message', messageHandler);
            gettingKeyList=false;
            console.log(`keyCount=${keys.length}`)
            res.set('Content-Range', `key ${0}-${keys.length-1}/${keys.length}`)
            return res.send(keys); // send the response and return

        }
    
        const messageHandler=(topic: string, message: Buffer)=> {
            if(topic==="devnfc/send" || topic==="/devnfc/send"){

                try {
                    const messageString = message.toString()
                    const messageJSON = JSON.parse(messageString)
                    if(messageJSON.cmd==="adduser"){
                        console.log(messageJSON.uid);

                        const keyObj={
                            id: messageJSON.uid,
                            readerIp: reader.ip,
                            readerId: reader.id,
                            uid: messageJSON.uid,
                            name: messageJSON.user,
                            acctype: messageJSON.acctype? 1 : 0,
                            acctype2: messageJSON.acctype2? 1 : 0,
                            acctype3: messageJSON.acctype3? 1 : 0,
                            acctype4: messageJSON.acctype4? 1 : 0,
                            acctype5: messageJSON.acctype5? 1 : 0,
                            acctype6: messageJSON.acctype6? 1 : 0,
                            validUntil: dateFromUnix(messageJSON.validuntil)
                            
                        };
                        keys.push(keyObj); // add the key to the array
                        createReaderKey(keyObj); // create a db entry for the key
                        console.log("timer extended after receiving new key")
                        
                        if(timeout) clearTimeout(timeout); // stop the timer
                        timeout=setTimeout(sendResponse, 3000); // wait another 3 seconds for the next key or listUserState message

                    }else if(messageJSON.cmd==="listUserState"){
                        /* json["cmd"]="listUserState";
                            json["done"]=false;
                            json["lastIndex"]=i;  
                        */
                       if(timeout) clearTimeout(timeout);
                       if(messageJSON.done){
                            // if everything goes well we return the response from here
                            if(timeout) clearTimeout(timeout);
                            return sendResponse();
                       }else{
                            if(timeout) clearTimeout(timeout); 
                            timeout=setTimeout(sendResponse, 3000);

                            client.publish("devnfc", JSON.stringify({ // if done is not true get another batch of keys
                                cmd: "listusr",
                                doorip: reader.ip,
                                skip: keys.length, // start the batch at keys.length
                                take: keyBatchLength  // get the first 3 keys on the controller
                            }))
                       }
                    }

            }
                catch (error) {
                    //console.log(error)
                    console.log("error parsing following content as json: " )
                }
            }
        }

        if(!client.connected){
            return res.status(500).send({error: "connection to the MQTT client was lost"})
        }
        timeout=setTimeout(()=>{ // initialy give the controller 6 seconds to return the first key otherwise there are no and we can return
            console.log("timed out and listener removed")
            client.off('message', messageHandler);
            gettingKeyList=false;
            return res.status(404).send({
                ip: reader.ip,
                keys: keys,
                message: "looks like there are no keys on the reader"
            });

        }, 6000);

        client.on('message', messageHandler)
    } catch (error) {
        return res.status(500).send({error})
    }
       
}


export async function deleteAllKeys(req: Request, res: Response){
    const {id}=req.params;
    const readerResult=await getRepository(Reader).findOne(id);
    if(!readerResult){
        return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
    }
    if(!client.connected){
        return res.status(500).send({error: "connection to the MQTT client was lost"})
    }
    client.publish('devnfc', JSON.stringify({
        cmd: "deletusers",
        doorip: readerResult.ip,
        doorname: readerResult.readerName
    }))
    // we should wait for an answer here
    res.send({message: `successfully deleted all keys on the reader with the ip: ${readerResult.ip} and name: ${readerResult.readerName}`})
}

// add delete for single user


export async function syncAllKeys(req: Request, res: Response){
    // first delete all key off the reader
    const {id}=req.params;
    const readerResult = await getRepository(Reader).findOne(id, {relations: ["readerKeys", "readerKeys.key"]})

    if(!readerResult){
        return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
    }
    if(!client.connected){
        return res.status(500).send({error: "connection to the MQTT client was lost"})
    }
    client.publish('devnfc', JSON.stringify({
        cmd: "deletusers",
        doorip: readerResult.ip,
        doorname: readerResult.readerName
    }))
    /* create listener that waits for delete done identify the reader by name and send code */

    const deleteWaitTime=readerConfig.deleteTime; // lets give the reader some time to delete all the keys
    await wait(deleteWaitTime); 
    
   
    if(readerResult.readerKeys && readerResult.readerKeys.length){
        const delay=readerConfig.syncTime;
        const keyCount=readerResult.readerKeys.length;
        const totalTime=delay*keyCount;
        //readerResult.keys.forEach()
        for(let readerKey of readerResult.readerKeys){
            if(client.connected && readerKey.key){
                // if we are connected we send each key to the reader with delay of 0.3s
                await wait(delay);
                client.publish('devnfc', JSON.stringify({
                    cmd: "adduser",
                    doorip: readerResult.ip,
                    uid: readerKey.key.uid,
                    user: readerKey.key.name,
                    acctype: readerKey.acctype,
                    acctype2: readerKey.acctype2,
                    acctype3: readerKey.acctype3,
                    acctype4: readerKey.acctype4,
                    acctype5: readerKey.acctype5,
                    acctype6: readerKey.acctype6,
                    validuntil: dateToUnix(readerKey.key.validUntil)
                }))
            }
        }
        const timeInSeconds=(totalTime+deleteWaitTime) / 1000;
        return res.send({message: `started syncing ${keyCount} keys to the reader it should be done in ${timeInSeconds} seconds`, time: timeInSeconds})

    }else {
        return res.status(404).send({message: `looks like the reader does not have any keys related to it in the database`})
    }

 
}