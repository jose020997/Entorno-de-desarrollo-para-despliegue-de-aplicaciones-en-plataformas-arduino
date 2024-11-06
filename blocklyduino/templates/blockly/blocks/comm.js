/**
 * @fileoverview WiFi com
 * @author a@red.ujaen.es)
 */

goog.provide('Blockly.Blocks.comm');

goog.require('Blockly.Blocks');


Blockly.Blocks['wifi'] = {
  helpUrl: 'https://docs.arduino.cc/hardware/uno-wifi-rev2',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("WiFi")
        .appendField(new Blockly.FieldImage("https://files.seeedstudio.com/wiki/SeeedStudio-XIAO-ESP32S3/img/xiaoesp32s3.jpg", 64, 64))
    this.appendValueInput("SSID", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("ssid");
    this.appendValueInput("PWD", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("passwd");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('WiFi com');
  }
};

Blockly.Blocks['mqtt-broker'] = {
  helpUrl: 'https://docs.arduino.cc/hardware/uno-wifi-rev2',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("MQTT Broker")
        .appendField(new Blockly.FieldImage("https://d1q6f0aelx0por.cloudfront.net/product-logos/library-eclipse-mosquitto-logo.png", 64, 64))
    this.appendValueInput("Broker IP", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Broker IP");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('MQTT Connection');
  }
};

Blockly.Blocks['mqtt-subscriber'] = {
  helpUrl: 'https://docs.arduino.cc/hardware/uno-wifi-rev2',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("MQTT Subscriber")
        .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/1495/PNG/512/arduino_103028.png", 64, 64))
    this.appendValueInput("Topic", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Topic");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('MQTT Subscription');
  }
};

Blockly.Blocks['mqtt-publisher'] = {
  helpUrl: 'https://docs.arduino.cc/hardware/uno-wifi-rev2',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("MQTT Publisher")
        .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/1495/PNG/512/arduino_103028.png", 64, 64))
    this.appendValueInput("Topic", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Topic");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('MQTT Publication');
  }
};