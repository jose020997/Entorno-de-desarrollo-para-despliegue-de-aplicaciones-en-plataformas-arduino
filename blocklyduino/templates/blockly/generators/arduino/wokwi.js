/**
 * @fileoverview Helper functions for generating wokwi blocks.
 * @author zmh@red.ujaen.es
 */

goog.provide('Blockly.Arduino.wokwi');

goog.require('Blockly.Arduino');

Blockly.Arduino.wokwi_open_project = function () {
    var device = this.getFieldValue("DEVICE");
    var agent = Blockly.Arduino.valueToCode(this, "AGENT", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''";
    var url = Blockly.Arduino.valueToCode(this, "TEXT", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''";
    
    Blockly.Arduino.definitions_['define_wokwi_open_project'] = "#include <Arduino.h>\n";
    Blockly.Arduino.definitions_["var_open_project"] = '';
    Blockly.Arduino.setups_["setup_open_project"] = '';
    
    Blockly.Arduino.wokwi_project = url;
    Blockly.Arduino.wokwi_device = device;
    Blockly.Arduino.wokwi_agent = agent;
    
    return "";
};


Blockly.Arduino.wokwi_i2c_lcd_print = function () {
    var a = this.getFieldValue("PIN"),
        b = Blockly.Arduino.valueToCode(this, "TEXT", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''",
        c = Blockly.Arduino.valueToCode(this, "TEXT2", Blockly.Arduino.ORDER_UNARY_POSTFIX) || "''",
        d = Blockly.Arduino.valueToCode(this, "DELAY_TIME", Blockly.Arduino.ORDER_ATOMIC) || "1000";
    Blockly.Arduino.definitions_.define_wokwi_i2c_lcd = "#include <LiquidCrystal_I2C.h>\n#include <Wire.h>\n";
    Blockly.Arduino.definitions_.define_softwareserial = "";
    var e = 1;
    Blockly.Arduino.definitions_["var_lcd"] = "LiquidCrystal_I2C LCD = LiquidCrystal_I2C(" + a + ", 16, 2);\n";
    Blockly.Arduino.setups_["setup_lcd"] = "LCD.init();\n  LCD.backlight();\n";
    e = "" + "LCD.setCursor(0,0);\n";
    e += "LCD.print(" + b + ");\n";
    e += "LCD.setCursor(0,1);\n";
    e += "LCD.print(" + c + ");\n";
    return (e += "delay(" + d + ");\n");
};

Blockly.Arduino.wokwi_ultrasonic_ranger = function () {
    var a = this.getFieldValue("PIN"),
        b = 0;
    Blockly.Arduino.definitions_.define_wokwi_ultrasonic =
        "#define ECHO_PIN " +
        a +
        "\n#define TRIG_PIN " +
        eval(parseInt(a) + 1) +
        "\n\nfloat readDistance() {\n  digitalWrite(TRIG_PIN, LOW);\n  delayMicroseconds(2);\n  digitalWrite(TRIG_PIN, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG_PIN, LOW);\n  return pulseIn(ECHO_PIN, HIGH) * 0.0343 / 2;\n}\n";
    Blockly.Arduino.setups_["setup_input_" + a] = "pinMode(TRIG_PIN, OUTPUT);\n  pinMode(ECHO_PIN, INPUT);";
    return ["cm" === b ? "readDistance()" : "leeDistancia()", Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.wokwi_temperature_sensor = function () {
    var a = this.getFieldValue("PIN"),
        b = this.getFieldValue("SENSOR");
    Blockly.Arduino.definitions_.define_wokwi_ultrasonic =
    "#include \"DHT.h\"\n" +
    "#define DHTTYPE " + b + "\n" +
    "const int DHT_PIN = " + a + "; \n" +
    "DHT dhtSensor(DHT_PIN, DHTTYPE);\n\n" +
    "String readDht22(){\n" +
    "  return \"{\\\"temp\\\": \" + String(dhtSensor.readTemperature()) + \" , \\\"humd\\\": \" + String(dhtSensor.readHumidity()) + \"}\";\n" +
    "}\n";
    Blockly.Arduino.setups_["setup_input_" + a] = "dhtSensor.begin();\n";
    return ['readDht22()', Blockly.Arduino.ORDER_ATOMIC];
};



Blockly.Arduino.wokwi_piezo_buzzer_tone = function () {
    var a = this.getFieldValue("PIN"),
        b = 0;
    Blockly.Arduino.setups_["setup_piezo_buzzer_" + a] = "pinMode(" + a + ", OUTPUT);";
    return "tone(" + a + ",250,25" + ");\n";
};

