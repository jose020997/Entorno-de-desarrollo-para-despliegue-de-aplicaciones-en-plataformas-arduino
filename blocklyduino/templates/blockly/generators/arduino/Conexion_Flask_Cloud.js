/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */


goog.provide('Blockly.Arduino.network');

goog.require('Blockly.Arduino');

/**
  if (Blockly.Arduino.wokwi_device == 'unowifi'){
    Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFiNINA.h>\n';
  }
  if (Blockly.Arduino.wokwi_device == 'esp'){
    Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFi.h>\n';
  }
  if (Blockly.Arduino.wokwi_device == 'open'){
    Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFi.h>\n';
  }

 - Meter este bloque si el sensor de temperatura esta conectado que lo pueda mandar o cosas asi 
 - Meter una linea mas para indicar el tiempo de envio de datos
**/


/* Empezamos aqui */

Blockly.Arduino.conexion_googlecloud = function(block) {
	var value_dire = Blockly.Arduino.valueToCode(block, 'Dire', Blockly.Arduino.ORDER_ATOMIC);
	var value_puer = Blockly.Arduino.valueToCode(block, 'Puer', Blockly.Arduino.ORDER_ATOMIC);
	var value_valo = Blockly.Arduino.valueToCode(block, 'valo', Blockly.Arduino.ORDER_ATOMIC);
	var value_endp = Blockly.Arduino.valueToCode(block, 'Endp', Blockly.Arduino.ORDER_ATOMIC);
	var value_topic = Blockly.Arduino.valueToCode(block, 'Topi', Blockly.Arduino.ORDER_ATOMIC);
	var value_refresco = Blockly.Arduino.valueToCode(block, 'TiempoRefresco', Blockly.Arduino.ORDER_ATOMIC);


  	if (!Blockly.Arduino.definitions_['define_wifi']) {
    		throw 'Error: Necesitas configurar el WiFi antes de conectar a Google Cloud.';
  	}


	var librerias = '';
	var definiciones = '';
	var setup = "";
	var loop = "";
	
	librerias += '#include <WiFiClient.h>\n';
	
	definiciones += `
// Conexion Pub Google Cloud
const char* dirservidor = ${value_dire};
const char* puertoservidor = ${value_puer};
WiFiClient client;
unsigned long previousMillis = 0;
const char* topic = ${value_topic}
//Recomendamos 20000
const long interval = ${value_refresco};
	`;

	loop += `	
	unsigned long currentMillis = millis();
	if (currentMillis - previousMillis >= interval) { 
		previousMillis = currentMillis;
	    	
		if (!client.connect(dirservidor , puertoservidor )) {
      			Serial.println("Connection to server failed");
      			return;
    		}
		String valoramandar = ${value_valo};
		String postData = "{\"tipodato\":\ + String(topic) + "\,\"valor\":\"" + valoramandar + "\"}";

		//client.println("POST ${value_endp} HTTP/1.1");
		client.println("POST " + String(${value_endp}) + " HTTP/1.1");
   		client.print("Host: ");
    		client.println(dirservidor);
    		client.println("Content-Type: application/json");
    		client.print("Content-Length: ");
    		client.println(postData.length());
    		client.println();
    		client.println(postData);

    		Serial.println("Data sent to server.");
    		client.stop();
  	}
	delay(100);
	`;
	
	/* tiene que ser una clave unica dentro del proyecto no se relaciona con nada ( definitions_ [ ] ) */
	Blockly.Arduino.definitions_['define_conexion'] = librerias;
	Blockly.Arduino.definitions_['variables_conexion'] = definiciones;
	Blockly.Arduino.setups_['setup_conexion'] = setup;
	
	return loop;
};
