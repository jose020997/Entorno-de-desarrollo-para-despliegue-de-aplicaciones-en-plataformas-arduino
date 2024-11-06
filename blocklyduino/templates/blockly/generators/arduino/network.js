/**
 * @fileoverview Network functions
 * @author zmh@red.ujaen.es)
 */


goog.provide('Blockly.Arduino.network');

goog.require('Blockly.Arduino');

Blockly.Arduino.network_wifi = function() {
  var ssid = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var pwd = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  if (Blockly.Arduino.wokwi_device == 'unowifi'){
      Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFiNINA.h>\n';
  } else if (Blockly.Arduino.wokwi_device == 'esp' || Blockly.Arduino.wokwi_device == 'open' || Blockly.Arduino.wokwi_device == 'esp32dev') {
      Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFi.h>\n';
  }

  if (Blockly.Arduino.wokwi_device != 'ino') {
      Blockly.Arduino.definitions_['var_wifi'] = '// WiFi credentials\nconst char* ssid = ' + ssid + ';\nconst char* password = ' + pwd + ';\n';
      
      var setup = 'Serial.begin(9600);\n';
      if (Blockly.Arduino.wokwi_device != 'unowifi') {
          setup += 'WiFi.begin(ssid, password);\n';
      }
      setup += 'while (WiFi.status() != WL_CONNECTED) {\n';
      if (Blockly.Arduino.wokwi_device == 'unowifi') {
          setup += 'WiFi.begin(ssid, password);\n';
      }
      setup += 'Serial.print(".");\n';
      setup += 'delay(250);\n';
      setup += '}\n';
      setup += 'Serial.print("Connected to WiFi. IP: ");\n';
      setup += 'Serial.println(WiFi.localIP());\n';
      Blockly.Arduino.setups_['setup_wifi'] = setup;
  }
  
  // Devuelve el valor de wokwi_device para su uso en el contexto de Blockly
  return "";
};

Blockly.Arduino.network_wifi_jose = function() {
  var ssid = Blockly.Arduino.valueToCode(this, 'SSID', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var pwd = Blockly.Arduino.valueToCode(this, 'PWD', Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  if (Blockly.Arduino.wokwi_device == 'unowifi'){
      Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFiNINA.h>\n';
  } else if (Blockly.Arduino.wokwi_device == 'esp' || Blockly.Arduino.wokwi_device == 'open' || Blockly.Arduino.wokwi_device == 'esp32dev') {
      Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFi.h>\n';
  }

  if (Blockly.Arduino.wokwi_device != 'ino') {
      Blockly.Arduino.definitions_['var_wifi'] = '// WiFi credentials\nconst char* ssid = ' + ssid + ';\nconst char* password = ' + pwd + ';\n';
      
      var setup = 'Serial.begin(9600);\n';
      if (Blockly.Arduino.wokwi_device != 'unowifi') {
          setup += 'WiFi.begin(ssid, password);\n';
      }
      setup += 'while (WiFi.status() != WL_CONNECTED) {\n';
      if (Blockly.Arduino.wokwi_device == 'unowifi') {
          setup += 'WiFi.begin(ssid, password);\n';
      }
      setup += 'Serial.print(".");\n';
      setup += 'delay(250);\n';
      setup += '}\n';
      setup += 'Serial.print("Connected to WiFi. IP: ");\n';
      setup += 'Serial.println(WiFi.localIP());\n';
      Blockly.Arduino.setups_['setup_wifi'] = setup;
  }
  
  // Devuelve el valor de wokwi_device para su uso en el contexto de Blockly
  return "";
};

/* Bluetooth
*/
Blockly.Arduino.network_bt = function() {
  var msg = Blockly.Arduino.valueToCode(this, 'MESSAGE',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var bt_device = this.getFieldValue("PIN");

  var include = '';
  var defi ='';
  var setup ='';
  var code = '';

  if (Blockly.Arduino.wokwi_device == 'unowifi'){
      include +='#include <SoftwareSerial.h>\n';
      defi    +='SoftwareSerial mySerial(' + bt_device + ',' +  eval(parseInt(bt_device) + 1) + '); // RX, TX \n';
      setup   +='mySerial.begin(9600);\n';

      code +='String msg = String(' + msg + ');\n';
      code +='const char* payload = msg.c_str();\n';
      code +='mySerial.write(payload);\n';
  }else{
  }
  Blockly.Arduino.definitions_['define_bt'] = include;
  Blockly.Arduino.definitions_['var_bt'] = defi;
  Blockly.Arduino.setups_['setup_bt'] = setup;
  return code;
};


/* MQTT Client
*/
Blockly.Arduino.network_mqtt_broker = function() {
  var broker_ip = Blockly.Arduino.valueToCode(this, 'IP',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  var include = '';
  var defi ='// Broker parameters\n';
  var setup ='';
  var code = '';

  if (Blockly.Arduino.wokwi_device != 'ino'){
      include +='#include <PubSubClient.h>\n';

      defi    +='const char* mqttServer = '+broker_ip+';\n';
      defi    +='const int mqttPort = 1883;\n';
      defi    +='const char* mqttUser = "";\n';
      defi    +='const char* mqttPassword = "";\n\n';
      defi    +='WiFiClient espClient;\n';
      defi    +='PubSubClient client(espClient);\n\n';
      defi    +='void mqttReconnect() {\n';
      defi    +='  char clientId[50];\n';
      defi    +='  while (!client.connected()) {\n';
      defi    +='    Serial.println("Connected to MQTT broker...");\n';
      defi    +='    long r = random(1000);\n';
      defi    +='    sprintf(clientId, "epsl-%ld", r);\n';
      defi    +='    if (client.connect(clientId, mqttUser, mqttPassword )) {\n';
      defi    +='      Serial.println("Connected");\n';
      defi    +='    } else {\n';
      defi    +='      Serial.print("Error. Status ");\n';
      defi    +='      Serial.println(client.state());\n';
      defi    +='      delay(2000);\n';
      defi    +='    }\n';
      defi    +='  }\n';
      defi    +='}\n\n';

      setup    +=' client.setServer(mqttServer, mqttPort);\n';

      code  = 'if (!client.connected()) {\n';
      code += '  mqttReconnect();\n';
      code += '}\n';
  }else{
  }
  Blockly.Arduino.definitions_['define_broker'] = include;
  Blockly.Arduino.definitions_['var_broker'] = defi;
  Blockly.Arduino.setups_['setup_broker'] = setup;
  return code;
};

/* MQTT Subscriber
*/
Blockly.Arduino.network_mqtt_subscriber = function() {
  var topic = Blockly.Arduino.valueToCode(this, 'TOPIC',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var branch = Blockly.Arduino.statementToCode(this, 'CALLBACK');

  var defi ='const char* topic = '+topic+';\n';
  var setup =' Serial.print("Suscribing to topic: ");\n';
  var setup =' Serial.println(topic);\n';
  var defi2 ='';
  var code ='';
  if (Blockly.Arduino.wokwi_device != 'ino'){
      var p = branch;
      setup    +='   // subscribe to a topic\n';
      setup    +='   client.setCallback(onMessage);\n';

      defi2 ='void onMessage(char* topi, byte* message, unsigned int length) {\n';
      defi2    +='  if(strcmp(topi, topic) == 0){\n';
      defi2    +='    message[length] = 0;\n';
      defi2    +='    String msg = (char *)message;\n';
      defi2    +='  ' + p;
      defi2    +='  }\n';
      defi2    +='}\n';

      //Blockly.Arduino.definitions_['define_sub'] = '#include <ArduinoJson.h>\n';
      Blockly.Arduino.definitions_['var_sub'] = defi;
      Blockly.Arduino.definitions_['var_sub2'] = defi2;
      Blockly.Arduino.setups_['setup_sub'] = setup;
      code = 'client.subscribe(topic);\nclient.loop();\n';
  }
  return code;
};



/* MQTT Publisher
*/
Blockly.Arduino.network_mqtt_publisher = function() {
  var topic = Blockly.Arduino.valueToCode(this, 'TOPIC',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var msg = Blockly.Arduino.valueToCode(this, 'MESSAGE',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  var code ='';
 if (Blockly.Arduino.wokwi_device != 'ino'){
  code  ='const char* topic = '+topic+';\n';
  code +='String msg = String(' + msg + ');\n';
  code +='const char* payload = msg.c_str();\n';

  //Blockly.Arduino.definitions_['define_sub'] = '#include <ArduinoJson.h>;\n';
  Blockly.Arduino.setups_['setup_pub'] = '';

  code += 'client.publish(topic, payload);\n';
  }

  return code;
};


/* Web Server
*/
Blockly.Arduino.network_web_server = function() {
  var uri = Blockly.Arduino.valueToCode(this, 'URI',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var send = Blockly.Arduino.valueToCode(this, 'SEND',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  var branch = Blockly.Arduino.statementToCode(this, 'CALLBACK');

  var defi ='#include <WebServer.h>;\n\n';
  defi +='#include <uri/UriBraces.h>\n';
  defi +='WebServer server(80);\n';
  var setup ='';
  var code ='';
  if (Blockly.Arduino.wokwi_device != 'ino'){
      var p = branch;
      setup +='server.on(UriBraces(' + uri + '), []() {\n' + p;
      setup +='  String msg = String(' + send + ');\n';
      setup +='  const char* payload = msg.c_str();\n';
      setup +='  server.send(200, "application/json", payload);\n';
      setup +='  });\n\n';
      setup    +='  server.begin();\n';
      setup    +='  Serial.println("HTTP server started");\n';
      Blockly.Arduino.definitions_['var_server'] = defi;
      if (Blockly.Arduino.setups_['setup_server'] ==  null){
        code = '  server.handleClient();\n';
        Blockly.Arduino.setups_['setup_server'] = " ";
      }
      else
        code = '';
      Blockly.Arduino.setups_['setup_server' + uri] = setup;
  }
  return code;
};


/* HTTP request
*/
Blockly.Arduino.network_http_request = function() {
  var method = this.getFieldValue("METHOD");
  var url = Blockly.Arduino.valueToCode(this, 'URL',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var msg = Blockly.Arduino.valueToCode(this, 'MESSAGE',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  var code ='';
  if (Blockly.Arduino.wokwi_device != 'ino'){
  code +='String msg = String(' + msg + ');\n';
  code +='const char* payload = msg.c_str();\n';
  code +='// Send HTTP request\n';
  code +='http.begin(espClient, service_url);\n';
  code +='http.addHeader("Content-Type", "application/json");\n';
  if (method == 'POST'){
    code +='int res_code = http.POST(payload);\n';
    code +='Serial.println(payload);\n\n';
  }
  else {
    code +='int res_code = http.GET();\n';
    code +='String payload_rec = http.getString();\n';
    code +='Serial.println(payload_rec);\n';
   }
  code +='http.end();\n\n';
  code +='Serial.println(res_code);\n';

  Blockly.Arduino.definitions_['define_http'] = '#include <HTTPClient.h>;\n\n' +
                                                'WiFiClient espClient;\n' +
                                                'HTTPClient http;\n\n' +
                                                'const char* service_url = ' + url + ';\n\n';
  Blockly.Arduino.setups_['setup_http'] = '';
  }
  return code;
};