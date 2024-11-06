/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */


 Blockly.Arduino.openia = function(block) {
	var token = Blockly.Arduino.valueToCode(block, 'bared', Blockly.Arduino.ORDER_ATOMIC);
    var pregunta = Blockly.Arduino.valueToCode(block, 'pregunta', Blockly.Arduino.ORDER_ATOMIC);
    

    if (!Blockly.Arduino.definitions_['define_wifi']) {
		throw 'Error: Necesitas configurar el WiFi antes de conectar a Google Cloud.';
  	}

    var librerias = '';
    var definiciones = '';
    var setup = "";
    var loop = "";

    librerias += `
#include <ArduinoJson.h>
#include <HTTPClient.h>
          `;


    definiciones += `
String serverName2 = "https://api.openai.com/v1/chat/completions";
String payload;
int httpResponseCode;
String httpRequestData;
String texto;

char* pregunta = ${pregunta};
char* token = ${token};

String llm_request(String msg){
    int httpResponseCode;
    String httpRequestData;
    String res = "not found";
     
    if(WiFi.status()== WL_CONNECTED){ 
      HTTPClient http;
      http.begin(serverName2); 
      http.addHeader("Authorization", "Bearer "+ String(token));
      http.addHeader("Content-Type", "application/json"); 
      httpRequestData =  "{\\"model\\": \\"gpt-4o-mini\\", \\"messages\\": [{\\"role\\": \\"user\\", \\"content\\": \\"";
      httpRequestData.concat(msg);
      httpRequestData.concat("\\"}], \\"temperature\\": 0.7, \\"max_tokens\\":100}");             
      
      // Send HTTP POST request
      httpResponseCode = http.POST(httpRequestData);
      Serial.print("HTTP Response code: ");
      Serial.println(httpResponseCode);
              
      if (httpResponseCode>0) {
        payload = http.getString();
        JsonDocument jsonDoc;
        deserializeJson(jsonDoc, payload);
        String outputText = jsonDoc["choices"][0]["message"]["content"];
        res = outputText;
      }
      // Free resources
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }  
    return res;
}
    `;
          

    loop += `	
    String msg = String(pregunta);
    String llm_response = llm_request(msg);
    Serial.println(llm_response);
    `;

  Blockly.Arduino.definitions_['define_insertsql'] = librerias;
	Blockly.Arduino.definitions_['variables_insertsql'] = definiciones;
	Blockly.Arduino.setups_['setup_insertsql'] = setup;
  return loop;
 };