import { getRepository, Repository } from "typeorm"
import { Request, Response } from "express"
import { Reader } from "../entity/Reader"
import { client } from "../mqtt/connection";
import { Key } from "../entity/Key";
import getList from "../util/getList";
import { ReaderKey } from "../entity/ReaderKey";
import dateFromUnix from "../util/dateFromUnix";
import wait from "../util/wait";
import dateToUnix from "../util/dateToUnix";

/* var log = console.log;
console.log = function() {
    log.apply(console, arguments);
    // Print the stack trace
    console.trace();
};


// Somewhere else...
function foo(){
    console.log('Foobar');
}
foo();

 */
let gettingKeyList=false;


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
        }))
        res.send({message: "succes"})
    } catch (error) {
        res.status(500).send({error: error})
    }
    
}

export async function getReaderKeys(req: Request, res: Response){
    
}


export async function generateReaderKeys(req: Request, res: Response) {
    // tell the reader to send us all keys that are currently stored on it
    if(gettingKeyList){
        return res.status(500).send({message: "already getting the keylist of another reader"})
    }
    const id=req.params.id;
    const readerRepository: Repository<Reader> = getRepository(Reader);
    const reader=await readerRepository.findOne(id);
    console.log(reader)
    if(!reader){
        return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
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
        const messageString = message.toString()
        try {
            const messageJSON = JSON.parse(messageString)
    
            if(topic==="devnfc/send" || topic==="/devnfc/send"){
                console.log("received key")
                const keyObj={
                    readerIp: reader.ip,
                    readerId: reader.id,
                    uid: messageJSON.uid,
                    name: messageJSON.user,
                    acctype: messageJSON.acctype || 0,
                    acctype2: messageJSON.acctype2  || 0,
                    acctype3: messageJSON.acctype3 || 0,
                    acctype4: messageJSON.acctype4 || 0,
                    validUntil: dateFromUnix(messageJSON.validuntil)
                    
                };
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
    
        } catch (error) {
            console.log("error parsing following content as json: " + messageString)
            console.log(error)
            
        }
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
        console.log(reader)
        if(!reader){
            return res.status(404).send({message: `could not find reader with the provided id: ${readerId}`})
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

    
        const messageHandler=(topic: string, message: Buffer)=> {
            // message is Buffer
            const messageString = message.toString()
            try {
                const messageJSON = JSON.parse(messageString)
        
                if(topic==="devnfc/send" || topic==="/devnfc/send"){
                    console.log("received key")
                    const keyObj={
                        id: messageJSON.uid,
                        readerIp: reader.ip,
                        readerId: reader.id,
                        uid: messageJSON.uid,
                        name: messageJSON.user,
                        acctype: messageJSON.acctype || 0,
                        acctype2: messageJSON.acctype2  || 0,
                        acctype3: messageJSON.acctype3 || 0,
                        acctype4: messageJSON.acctype4 || 0,
                        validUntil: dateFromUnix(messageJSON.validuntil)
                        
                    };
                    keys.push(keyObj); // add the key to the array
                    createReaderKey(keyObj); // create a db entry for the key
                    console.log("timer extended after receiving new key")
                    if(timeout) clearTimeout(timeout); // stop the timer
                    timeout=setTimeout(()=>{ 
                        // start a new timer. If it is not cleared / stopped in n seconds (2 here) by receiving a new message 
                        // we can be pretty sure that we received all keys and can return the response
                        console.log("last answer was to long ago listener removed")
                        client.off('message', messageHandler);
                        gettingKeyList=false;

                        res.set('Content-Range', `key ${0}-${keys.length-1}/${keys.length}`)
                        return res.send(keys); // send the response and return

                    }, 2000);
                }
        
            } catch (error) {
                console.log("error parsing following content as json: " + messageString)
                console.log(error)
                
            }
        }

        timeout=setTimeout(()=>{ // initialy give the device 4 seconds to return the first user otherwise there are no and return
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
    } catch (error) {
        return res.status(500).send({error})
    }
    
    
    
}



async function createReaderKey(keyObj){
    try {
        /* console.log(`keyobject is`)
        console.log(keyObj) */
        const repo: Repository<ReaderKey>=getRepository(ReaderKey);
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

export async function getReaders(req: Request, res: Response) {
    getList(getRepository(Reader), req, res)
}

export async function getReaderWithKeys(req: Request, res: Response){
    try {
        const {id}=req.params;
        const readerRepository: Repository<Reader> = getRepository(Reader);

        const result = await readerRepository.findOne(id, {relations: ["keys"]});

        if(!result){
            return res.status(404).send({message: `could not find reader with the provided id ${id}`})
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        res.status(500).send({error: "server error"})
    }
}



export async function addReaderKeys(req: Request, res: Response) {
    // function creates a connection between the reader and key inside the database and sends it over to the reader
    try {
        const { body } = req;
        if (!(body.id && body.key_id)) throw "invalid request body"
        // check if reader with that ip exists
        const readerRepository: Repository<Reader> = getRepository(Reader);
        const readerResult = await readerRepository.findOneOrFail({ id: body.id}, {relations: ["keys"]})
        if (!readerResult) throw "no door found"
        // check if key with that id exists
        const keyResult: Key = await getRepository(Key).findOneOrFail({ id: body.key_id })
        //if (!keyResult) throw "no key found"
        
        // load all the keys that are already related to the reader

        // create connection between reader and key

        readerResult.keys=Array.isArray(readerResult.keys)? [...readerResult.keys, keyResult] : [keyResult];
        await readerRepository.save(readerResult);
        
        if(!client.connected){
            res.status(500).send({error: "connection to the MQTT client was lost"})
        }
        client.publish('devnfc', JSON.stringify({
            cmd: "adduser",
            doorip: readerResult.ip,
            uid: keyResult.uid,
            user: keyResult.name,
            acctype: keyResult.acctype,
            acctype2: keyResult.acctype2,
            acctype3: keyResult.acctype3,
            acctype4: keyResult.acctype4,
            validuntil: dateToUnix(keyResult.validUntil)
        }))
        res.send({
            message: "successfully created"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            error: "failed to create link"
        })
    }
}


export async function deleteAllKeys(req: Request, res: Response){
    const {id}=req.params;
    const readerResult=await getRepository(Reader).findOne(id);
    if(!readerResult){
        return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
    }
    if(!client.connected){
        res.status(500).send({error: "connection to the MQTT client was lost"})
    }
    client.publish('devnfc', JSON.stringify({
        cmd: "deletusers",
        doorip: readerResult.ip,
        doorname: readerResult.readerName
    }))
    // we should wait for an answer here
    res.send({message: `successfully deleted all keys on the reader with the ip: ${readerResult.ip} and name: ${readerResult.readerName}`})
}




export async function syncAllKeys(req: Request, res: Response){
    // first delete all key off the reader
    const {id}=req.params;
    const readerResult=await getRepository(Reader).findOne(id, {relations: ["keys"]});
    if(!readerResult){
        return res.status(404).send({message: `could not find reader with the provided id: ${id}`})
    }
    /* console.log(readerResult) */
    if(!client.connected){
        res.status(500).send({error: "connection to the MQTT client was lost"})
    }
    client.publish('devnfc', JSON.stringify({
        cmd: "deletusers",
        doorip: readerResult.ip,
        doorname: readerResult.readerName
    }))
    const deleteWaitTime=5000; // lets give the reader 5 seconds to delete all keys
    await wait(deleteWaitTime); 
    // we should wait for an answer here
    // now get all keys that are related to the reader from our database
    
    if(readerResult.keys && readerResult.keys.length){
        const delay=5000;
        const keyCount=readerResult.keys.length;
        const totalTime=delay*keyCount;
        //readerResult.keys.forEach()
        for(let key of readerResult.keys){
            if(client.connected){
                // if we are connected we send each key to the reader with delay of 0.3s
                await wait(delay);
                console.log(key)
                client.publish('devnfc', JSON.stringify({
                    cmd: "adduser",
                    doorip: readerResult.ip,
                    uid: key.uid,
                    user: key.name,
                    acctype: key.acctype,
                    acctype2: key.acctype2,
                    acctype3: key.acctype3,
                    acctype4: key.acctype4,
                    validuntil: dateToUnix(key.validUntil)
                }))
            }
        }
        res.send({message: `started syncing ${keyCount} keys to the reader it should be done in ${(totalTime+deleteWaitTime) / 1000} seconds`})

    }else {
        res.status(404).send({message: `looks like the reader does not have any keys related to it in the database`})
    }

 
}