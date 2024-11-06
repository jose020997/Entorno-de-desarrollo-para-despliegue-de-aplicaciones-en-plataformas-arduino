/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

Blockly.Arduino.cloud_conf = function(block) {
	var value_proyecto = Blockly.Arduino.valueToCode(block, 'proyecto', Blockly.Arduino.ORDER_ATOMIC);
	var value_topic = Blockly.Arduino.valueToCode(block, 'topic', Blockly.Arduino.ORDER_ATOMIC);
	var value_mensaje = Blockly.Arduino.valueToCode(block, 'mensaje', Blockly.Arduino.ORDER_ATOMIC);
    var value_email = Blockly.Arduino.valueToCode(block, 'Cliente_email', Blockly.Arduino.ORDER_ATOMIC);
	var value_clave = Blockly.Arduino.valueToCode(block, 'clave_privada', Blockly.Arduino.ORDER_ATOMIC);

    function replaceDoubleBackslashes(input) {
        return input.replace(/\\\\/g, '\\');
    }

    if (!Blockly.Arduino.definitions_['define_wifi']) {
        throw 'Error: Necesitas configurar el WiFi antes de conectar a Google Cloud.';
    }

    value_clave = replaceDoubleBackslashes(value_clave);
    
    var librerias = '';
      var definiciones = '';
      var setup = "";
      var loop = "";
      
      librerias += `
#include <WiFiClientSecure.h>
#include <HTTPClient.h>
#include "base64.h"
#include <ESP_Signer.h>
      `;
      
      definiciones += `
SignerConfig config;

const char* proyecto =  ${value_proyecto};
const char* topic = ${value_topic};
const char* mensaje = ${value_mensaje};
      
//Your Domain name with URL path or IP address with path
String serverName2 = "https://pubsub.googleapis.com/v1/projects/" + String(proyecto) + "/topics/" + String(topic) + ":publish";

String payload;
int httpResponseCode;
String httpRequestData;

WiFiClientSecure client;


void publish(String msg, String token){
      String recv_token0 = token;
      if(WiFi.status()== WL_CONNECTED){
          HTTPClient http;
          String bearer = "Bearer ";
              String recv_token = bearer + token;	// Adding "Bearer " before token
              // Sending POST request for Location Data.
              http.begin(client, serverName2); 
              http.addHeader("Authorization", recv_token); // Adding Bearer token as HTTP header
          http.addHeader("Content-Type", "application/json"); // Adding application/json Content-Type header
            
          httpRequestData = "{\\"messages\\": [{\\"data\\": \\"";
          httpRequestData.concat(base64::encode(msg));
          httpRequestData.concat("\\"}]}");     

          // Send HTTP POST request
          httpResponseCode = http.POST(httpRequestData);
          Serial.print("HTTP Response code: ");
          Serial.println(httpResponseCode);
              
          if (httpResponseCode>0) {
              payload = http.getString();
              Serial.println(payload);
          }
              // Free resources
          http.end();
      }
      else {
          Serial.println("WiFi Disconnected");
      }    
  }
      `;
  
      setup += `
    client.setInsecure();

    config.service_account.data.client_email = ${value_email},
    config.service_account.data.project_id = ${value_proyecto},
    config.service_account.data.private_key = ${value_clave},

    config.signer.expiredSeconds = 3600;

    config.signer.preRefreshSeconds = 60;

    config.signer.tokens.scope = "https://www.googleapis.com/auth/cloud-platform, https://www.googleapis.com/auth/userinfo.email";

    Signer.begin(&config);
      `
      
      loop += `	
String msg = mensaje;
String token;    
bool ready = Signer.tokenReady();
if (ready)
{
    token = Signer.accessToken().c_str();
    delay(1000);
    publish(msg, token);
}
      `;
      
      /* tiene que ser una clave unica dentro del proyecto no se relaciona con nada ( definitions_ [ ] ) */
      Blockly.Arduino.definitions_['define_conexion'] = librerias;
      Blockly.Arduino.definitions_['variables_conexion'] = definiciones;
      Blockly.Arduino.setups_['setup_conexion'] = setup;
      
      return loop;


};