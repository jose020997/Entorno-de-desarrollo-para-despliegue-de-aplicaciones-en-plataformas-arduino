/**
 * @fileoverview Network functions
 * @author zmh@red.ujaen.es)
 */

goog.provide('Blockly.Blocks.network');

goog.require('Blockly.Blocks');


Blockly.Blocks['network_wifi'] = {
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
    this.setTooltip('WiFi connection');
  }
};

Blockly.Blocks['network_wifi_jose'] = {
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
    this.setTooltip('WiFi connection');
  }
};

Blockly.Blocks['network_bt'] = {
    helpUrl: "",
    init: function () {
        this.setColour(30);
        this.appendDummyInput()
            .appendField("Bluetooth Send")
            .appendField(new Blockly.FieldImage("https://i.pinimg.com/originals/ce/67/c3/ce67c34e0015a33b5e4f08f520a84882.png", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("MESSAGE", "String").setAlign(Blockly.ALIGN_RIGHT).appendField("message");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("Send message to Bluetooth.");
    }
};

Blockly.Blocks['network_mqtt_broker'] = {
  helpUrl: '',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("MQTT Client")
        .appendField(new Blockly.FieldImage("https://d1q6f0aelx0por.cloudfront.net/product-logos/library-eclipse-mosquitto-logo.png", 64, 64))
    this.appendValueInput("IP", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("broker");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('MQTT Connection');
  }
};

Blockly.Blocks['network_mqtt_subscriber'] = {
  helpUrl: '',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("MQTT Subscriber")
        .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/1495/PNG/512/arduino_103028.png", 64, 64))
    this.appendValueInput("TOPIC", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("topic");
    this.appendStatementInput("CALLBACK")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("on message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Web server');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('MQTT Subscription');
  }
};















Blockly.Blocks['network_mqtt_publisher'] = {
  helpUrl: '',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("MQTT Publisher")
        .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/1495/PNG/512/arduino_103028.png", 64, 64))
    this.appendValueInput("TOPIC", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("topic");
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('MQTT Publication');
  }
};

Blockly.Blocks['network_web_server'] = {
  helpUrl: '',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("Web Server")
        .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/1495/PNG/512/arduino_103028.png", 64, 64))
        this.appendValueInput("URI", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("on uri");
    this.appendValueInput("SEND")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("send");
    this.appendStatementInput("CALLBACK")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("callback");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Web server');
  }
};

Blockly.Blocks['network_http_request'] = {
  helpUrl: '',
  init: function() {
    this.setColour(190);
    this.appendDummyInput()
        .appendField("HTTP Request")
        .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/1495/PNG/512/arduino_103028.png", 64, 64))
        .appendField("Method")
        .appendField(
            new Blockly.FieldDropdown([
                ["GET", "GET"],
                ["POST", "POST"],
            ]),
            "METHOD"
        );
    this.appendValueInput("URL", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("url");
    this.appendValueInput("MESSAGE")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("message");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('HTTP request client');
  }
};