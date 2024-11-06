/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */


goog.provide('Blockly.Arduino.network');

goog.require('Blockly.Arduino');

Blockly.Arduino.firebase = function(block) {
	var value_host = Blockly.Arduino.valueToCode(block, 'host', Blockly.Arduino.ORDER_ATOMIC);
    var value_auth = Blockly.Arduino.valueToCode(block, 'auth', Blockly.Arduino.ORDER_ATOMIC);
    var value_email = Blockly.Arduino.valueToCode(block, 'email', Blockly.Arduino.ORDER_ATOMIC);
    var value_pass = Blockly.Arduino.valueToCode(block, 'pass', Blockly.Arduino.ORDER_ATOMIC);

	if (!Blockly.Arduino.definitions_['define_wifi']) {
		throw 'Error: Necesitas configurar el WiFi antes de conectar a Google Cloud.';
  	}

    var librerias = '';
	var definiciones = '';
	var setup = "";
	var loop = "";
	
	librerias += `
#include <FirebaseESP32.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"
		`;
	
	definiciones += `
#define FIREBASE_HOST ${value_host}
#define FIREBASE_AUTH ${value_auth}

FirebaseAuth auth;
FirebaseConfig config;
FirebaseData fbdo;

void firebase_init() {

	config.api_key = FIREBASE_AUTH;
	config.database_url = FIREBASE_HOST;
  
	auth.user.email = ${value_email};
	auth.user.password = ${value_pass};
  
	Firebase.reconnectWiFi(true);
	Serial.println("------------------------------------");
  
	config.token_status_callback = tokenStatusCallback;
  
	Firebase.begin(&config, &auth);
	fbdo.setBSSLBufferSize(4096 /* Rx buffer size in bytes from 512 - 16384 */, 1024 /* Tx buffer size in bytes from 512 - 16384 */);
	fbdo.setResponseSize(2048);
  }

	`;
  	setup +=`
	firebase_init();
	
	`;

	loop += `
	`;
	
	/* tiene que ser una clave unica dentro del proyecto no se relaciona con nada ( definitions_ [ ] ) */
	Blockly.Arduino.definitions_['define_firebase'] = librerias;
	Blockly.Arduino.definitions_['variables_firebase'] = definiciones;
	Blockly.Arduino.setups_['setup_firebase'] = setup;
	return loop;
};