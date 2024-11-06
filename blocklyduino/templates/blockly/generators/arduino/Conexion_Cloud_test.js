/**
  @author jabg0014@red.ujaen.es
  Jose Antonio Barrios Garcia
  https://es.linkedin.com/in/joseantonio-barrios-garcia
*/

Blockly.Arduino.cloud_test = function(block) {
  var value_ssid = Blockly.Arduino.valueToCode(block, 'SSID', Blockly.Arduino.ORDER_ATOMIC);
  var value_pass = Blockly.Arduino.valueToCode(block, 'password', Blockly.Arduino.ORDER_ATOMIC);
  var value_proyecto = Blockly.Arduino.valueToCode(block, 'proyecto', Blockly.Arduino.ORDER_ATOMIC);
  var value_topic = Blockly.Arduino.valueToCode(block, 'topic', Blockly.Arduino.ORDER_ATOMIC);
  var value_mensaje = Blockly.Arduino.valueToCode(block, 'mensaje', Blockly.Arduino.ORDER_ATOMIC);
  var value_email = Blockly.Arduino.valueToCode(block, 'Cliente_email', Blockly.Arduino.ORDER_ATOMIC);
  var value_clave = Blockly.Arduino.valueToCode(block, 'clave_privada', Blockly.Arduino.ORDER_ATOMIC);

  var librerias = '';
  var definiciones = '';
  var setup = '';
  var loop = '';

  librerias += `
#include <Arduino.h>
#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include "base64.h"
#include <ESP_Signer.h>
  `;

  definiciones += `
SignerConfig config;

// WiFi credentials
const char* ssid = ${value_ssid};
const char* password = ${value_pass};
const char* proyecto = ${value_proyecto};
const char* topic = ${value_topic};
const char* mensaje = ${value_mensaje};

// Your Domain name with URL path or IP address with path
String serverName2 = "https://pubsub.googleapis.com/v1/projects/" + String(proyecto) + "/topics/" + String(topic) + ":publish";

String payload;
int httpResponseCode;

WiFiClientSecure client;

void publish(String msg, String token) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String bearer = "Bearer " + token;
    
    // Encode the message in base64
    String encodedMsg = base64::encode(msg);
    String httpRequestData = "{\"messages\": [{\"data\": \"" + encodedMsg + "\"}]}";
    
    // Sending POST request for Location Data
    http.begin(client, serverName2); 
    http.addHeader("Authorization", bearer); // Adding Bearer token as HTTP header
    http.addHeader("Content-Type", "application/json"); // Adding application/json Content-Type header
    
    // Send HTTP POST request
    httpResponseCode = http.POST(httpRequestData);
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    if (httpResponseCode > 0) {
      payload = http.getString();
      Serial.println(payload);
    }
    
    // Free resources
    http.end();
  } else {
    Serial.println("WiFi Disconnected");
  }    
}
  `;

  setup += `
Serial.begin(9600);
WiFi.begin(ssid, password);
while (WiFi.status() != WL_CONNECTED) {
  Serial.print(".");
  delay(250);
}
Serial.print("Connected to Wifi. IP :");
Serial.println(WiFi.localIP());
client.setInsecure();

/* Assign the service account credentials and private key (required) */
config.service_account.data.client_email = "jose-test-tfg@tfgjose.iam.gserviceaccount.com";
config.service_account.data.project_id = "tfgjose";
config.service_account.data.private_key = ${value_clave};

/* Expired period in seconds (optional). 
 * Default is 3600 sec.
 * This may not affect the expiry time of generated access token.
 */
config.signer.expiredSeconds = 3600;

/* Seconds to refresh the token before expiry time (optional). Default is 60 sec. */
config.signer.preRefreshSeconds = 60;

/* Assign the API scopes (required) 
 * Use space or comma to separate the scope.
 */
config.signer.tokens.scope = "https://www.googleapis.com/auth/cloud-platform, https://www.googleapis.com/auth/userinfo.email";

/* Create token */
Signer.begin(&config);
  `;

  loop += `
String msg = ${value_mensaje};
String token;    
bool ready = Signer.tokenReady();
if (ready) {
  token = Signer.accessToken().c_str();
  delay(1000);
  publish(msg, token);
}

delay(1000);
  `;

  // Tiene que ser una clave unica dentro del proyecto, no se relaciona con nada (definitions_[])
  Blockly.Arduino.definitions_['define_conexion_tes'] = librerias;
  Blockly.Arduino.definitions_['variables_conexion_tes'] = definiciones;
  Blockly.Arduino.setups_['setup_conexion_tes'] = setup;

  return loop;
};
