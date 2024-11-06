/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

 goog.provide('Blockly.Blocks.tutorial');

 goog.require('Blockly.Blocks');
 
 Blockly.Arduino.delay = function(block) {
	var delay = Blockly.Arduino.valueToCode(block, 'NAME', Blockly.Arduino.ORDER_ATOMIC);
    

    var librerias = '';
    var definiciones = '';
    var setup = "";
    var loop = "";

    loop += `
    delay(${delay});
    `;

    return loop;
 };