# mqtt-door-access-control
Node React App that lets you sync users of rfid doors over MQTT.   
Currently using exp rfid https://github.com/esprfid/esp-rfid for the hardware but might switch to Raspberry Pi.


# usage
git clone https://github.com/kantimam/mqtt-door-access-control.git  
start the MQTT broker of your choice (using Mosquitto so far) make sure it runs on port 1883  
adjust ormconfig.json or create a database / user with the matching values  
npm install  
npm start


