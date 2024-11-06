/**
 * @fileoverview Helper functions for generating wokwi blocks.
 * @author zmh@red.ujaen.es
 */

goog.provide('Blockly.Blocks.wokwi');

goog.require('Blockly.Blocks');


Blockly.Blocks.wokwi_open_project = {
    helpUrl: "",
    init: function () {
        this.setColour(90);
        this.appendDummyInput()
            .appendField("Project")
            .appendField(new Blockly.FieldImage("https://avatars.githubusercontent.com/u/56967200", 64, 64))
            .appendField("Device")
            .appendField(
                new Blockly.FieldDropdown([
                    ["Open existing Wokwi", "open"],
                    ["Wokwi Arduino UNO", "ino"],
                    ["Wokwi ESP32", "esp"],
                    ["Arduino uno wifi ", "unowifi"],
                    ["ESP32 device","esp32dev"]
                ]),
                "DEVICE"
            );
        this.appendValueInput("TEXT").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField("Wokwi project");
        this.appendValueInput("AGENT").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField("Agent address");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setTooltip("Open wokwi project.");
    },
};

Blockly.Blocks.wokwi_i2c_lcd_print = {
    helpUrl: "",
    init: function () {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("I2C LCD")
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/product/Serial%20LCD.jpg", 64, 64))
            .appendField("Address")
            .appendField(
                new Blockly.FieldDropdown([
                    ["0x27", "0x27"],
                    ["0x3F", "0x3F"],
                ]),
                "PIN"
            );
        this.appendValueInput("TEXT", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField("print line1");
        this.appendValueInput("TEXT2", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField("print line2");
        this.appendValueInput("DELAY_TIME", "Number").setCheck("Number").setAlign(Blockly.ALIGN_RIGHT).appendField("Delay");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("print text on an 16 character by 2 line LCD.");
    },
};

Blockly.Blocks.wokwi_ultrasonic_ranger = {
    helpUrl: "http://www.seeedstudio.com/wiki/Grove_-_Ultrasonic_Ranger",
    init: function () {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("Ultrasonic Ranger")
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/seeed/img/2016-09/kIyY21sbC6ct7JYzCWf1mAPs.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Number");
        this.setTooltip("Non-contact distance measurement module");
    },
};

Blockly.Blocks.wokwi_temperature_sensor = {
    helpUrl: "https://wiki.seeedstudio.com/Grove-Temperature_and_Humidity_Sensor_Pro/",
    init: function () {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("DHT Sensor")
            .appendField(
                new Blockly.FieldDropdown([
                    ["11", "11"],
                    ["22", "22"],
                ]),
                "SENSOR"
            )
            .appendField(new Blockly.FieldImage("https://store.prometec.net/wp-content/uploads/2019/06/humidity-temperature-sensor-dht22-500x500.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setOutput(!0, "Number");
        this.setTooltip("Non-contact distance measurement module");
    },
};

Blockly.Blocks.wokwi_piezo_buzzer_tone = {
    helpUrl: "http://www.seeedstudio.com/wiki/GROVE_-_Starter_Kit_V1.1b#Grove_.E2.80.93_Buzzer",
    init: function () {
        this.setColour(190);
        this.appendDummyInput()
            .appendField("Piezo Buzzer Tone")
            .appendField(new Blockly.FieldImage("https://statics3.seeedstudio.com/images/107020000%201.jpg", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("Emit a tone when the output is high");
    },
};
