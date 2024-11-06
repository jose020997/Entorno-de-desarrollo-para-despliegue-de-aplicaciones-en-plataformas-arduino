/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */


 Blockly.Arduino.firebase_lectura = function(block) {
	var value_nombre = Blockly.Arduino.valueToCode(block, 'ntabl', Blockly.Arduino.ORDER_ATOMIC);

    if (!Blockly.Arduino.definitions_['define_firebase']) {
		throw 'Error: Necesitas configurar el firebase antes de conectar a Google Cloud.';
  	}

    var librerias = '';
    var definiciones = '';
    var setup = "";
    var loop = "";

    loop += `
    if (Firebase.get(fbdo, ${value_nombre}))
    {
      double result = fbdo.to<double>();
      Serial.print("Data received: ");
      Serial.println(result);
    }
    else
    {
      Serial.print("Failed to get data: ");
      Serial.println(fbdo.errorReason());
    }
    `;

    return loop;
 };