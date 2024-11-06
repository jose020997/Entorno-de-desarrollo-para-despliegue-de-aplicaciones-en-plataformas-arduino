/**
 * @fileoverview WiFi com
 * @author a@red.ujaen.es)
 */


goog.provide('Blockly.Arduino.comm');

goog.require('Blockly.Arduino');


Blockly.Arduino.wifi = function() {
  var dropdown_pin = this.getFieldValue('SSID');
  var text = Blockly.Arduino.valueToCode(this, 'TEXT',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  Blockly.Arduino.definitions_['define_wifi'] = '#include <WiFiNINA.h>\n';
  Blockly.Arduino.definitions_['var_wifi'] = 'SerialLCD slcd\n';
  Blockly.Arduino.setups_['setup_wifi'] = 'slcd.begin();\n';
  var code = 'digitalWrite\n'
  return code;
};

