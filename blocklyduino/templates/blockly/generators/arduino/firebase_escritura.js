/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */


 Blockly.Arduino.firebase_escritura = function(block) {
	var value_nombre = Blockly.Arduino.valueToCode(block, 'ntabl', Blockly.Arduino.ORDER_ATOMIC);
    var value_value = Blockly.Arduino.valueToCode(block, 'valor', Blockly.Arduino.ORDER_ATOMIC);

    if (!Blockly.Arduino.definitions_['define_firebase']) {
		throw 'Error: Necesitas configurar el firebase antes de conectar a Google Cloud.';
  	}

    var librerias = '';
    var definiciones = '';
    var setup = "";
    var loop = "";

    loop += `
    double sensorValue = ${value_value};
    if (Firebase.setDouble(fbdo, ${value_nombre}, sensorValue))
    {
        Serial.print("Data sent successfully: ");
        Serial.println(sensorValue);
    }
    else
    {
        Serial.print("Failed to send data: ");
        Serial.println(fbdo.errorReason());
    }
    `;

    return loop;
 };