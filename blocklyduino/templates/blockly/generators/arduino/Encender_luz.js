Blockly.Arduino.encender_led = function(block) {
    var puerto = Blockly.Arduino.valueToCode(block, 'Pin', Blockly.Arduino.ORDER_ATOMIC);

    var include = '';
    var defi = '';
    var setup = '';
    var loop = '';

    include = `#include <Arduino.h>\n`;

    defi = `const int ledPin = ${puerto};`;

    setup = `  pinMode(ledPin, OUTPUT);
    // Iniciamos la comunicación serie a 115200 baudios
    Serial.begin(115200);
    Serial.println("Iniciando el ESP32...");`;

    loop = `  // Encendemos el LED
    digitalWrite(ledPin, HIGH);
    Serial.println("LED encendido");
    delay(1000);  // Esperamos 1 segundo (1000 milisegundos)

    // Apagamos el LED
    digitalWrite(ledPin, LOW);
    Serial.println("LED apagado");
    delay(4000);  // Esperamos 4 segundos (4000 milisegundos)`;

    Blockly.Arduino.definitions_['include_encender'] = include;
    Blockly.Arduino.definitions_['var_encender'] = defi;
    Blockly.Arduino.setups_['setup_encender'] = setup;
    return loop;
};