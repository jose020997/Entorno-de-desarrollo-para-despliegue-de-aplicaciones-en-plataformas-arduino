/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

 Blockly.Arduino.mysql_insert_flask = function(block) {
	var value_flask = Blockly.Arduino.valueToCode(block, 'Dflask', Blockly.Arduino.ORDER_ATOMIC);
	var value_dbd = Blockly.Arduino.valueToCode(block, 'DBD', Blockly.Arduino.ORDER_ATOMIC);
	var value_user = Blockly.Arduino.valueToCode(block, 'user', Blockly.Arduino.ORDER_ATOMIC);
	var value_pass = Blockly.Arduino.valueToCode(block, 'pass', Blockly.Arduino.ORDER_ATOMIC);
	var value_NombreBD = Blockly.Arduino.valueToCode(block, 'NombreBD', Blockly.Arduino.ORDER_ATOMIC);
	var dropdown_tabla = block.getFieldValue('tabla');
    var value_valor = Blockly.Arduino.valueToCode(block, 'valor', Blockly.Arduino.ORDER_ATOMIC);

  	if (!Blockly.Arduino.definitions_['define_wifi']) {
    		throw 'Error: Necesitas configurar el WiFi antes de conectar a Google Cloud.';
  	}


	var librerias = '';
	var definiciones = '';
	var setup = "";
	var loop = "";
	
	librerias += '#include <HTTPClient.h>\n';
	
	definiciones += `
const char* dirr = ${value_flask};
const char* url = "conexion_insert_cualquiera";
const char* dirrbd = ${value_dbd};
const char* user = ${value_user};
const char* pass = ${value_pass};
const char* db = ${value_NombreBD};
const char* tabla = "${dropdown_tabla}";
const char* valor = ${value_valor};

String serverUrl = String("https://") + dirr + "/" + url +
                  "?temperatura=" + valor +
                  "&host=" + dirrbd +
                  "&user=" + user +
                  "&pass=" + pass +
                  "&db=" + db +
                  "&tabla=" + tabla;
  
// Convierte la URL a const char*
const char* serverName = serverUrl.c_str();
	`;

	loop += `	
	HTTPClient http;
  
    http.begin(serverName);  // Inicia la solicitud HTTP

    int httpResponseCode = http.GET();  // Envía la solicitud GET con los parámetros en la URL

    if (httpResponseCode > 0) {
        String payload = http.getString();  // Obtiene el payload de la respuesta
        Serial.println("Código de respuesta HTTP: " + String(httpResponseCode));
        Serial.println("Respuesta del servidor: " + payload);
    } else {
        Serial.println("Error al realizar la solicitud HTTP");
        Serial.println("Código de error HTTP: " + String(httpResponseCode));
    }

    http.end();
	`;
	
	/* tiene que ser una clave unica dentro del proyecto no se relaciona con nada ( definitions_ [ ] ) */
	Blockly.Arduino.definitions_['define_insertsql'] = librerias;
	Blockly.Arduino.definitions_['variables_insertsql'] = definiciones;
	Blockly.Arduino.setups_['setup_insertsql'] = setup;
	
	return loop;
};
