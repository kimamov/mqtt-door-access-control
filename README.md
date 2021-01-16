# mqtt-door-access-control
Node React App that lets you sync users of rfid doors over MQTT.   
Currently using exp rfid https://github.com/esprfid/esp-rfid for the hardware but might switch to Raspberry Pi.


# usage
- git clone https://github.com/kantimam/mqtt-door-access-control.git  
- start the MQTT broker of your choice (using Mosquitto so far) make sure it runs on port 1883  
- use the ormconfig and .env template files to create your own ormconfig and .env files
- adjust ormconfig.json or create a database / user with the matching values
- put your secrets into .env
- install the servers dependencies with "npm install"
- change to client directory and install its dependencies with "npm install"
- if you want to deploy build the client with "npm run build"
- return to the server directory maybe by using "cd .."
- either start the the server with "npm start" or start the server and the client with "npm run dev"



