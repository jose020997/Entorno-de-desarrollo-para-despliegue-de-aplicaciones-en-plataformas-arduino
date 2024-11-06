Blockly.Arduino.network_bt_esp32 = function() {
    var msg = Blockly.Arduino.valueToCode(this, 'MESSAGE',
    Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    var name = Blockly.Arduino.valueToCode(this, 'NAME',
    Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
    var bt_device = this.getFieldValue("PIN");
    var include = '';
    var defi ='';
    var setup ='';
    var code = '';
  
    if (name == "''") name = '"BLOCKLY_BT"';
    if (Blockly.Arduino.wokwi_device == 'unowifi'){
        include +='#include <SoftwareSerial.h>\n';
        defi    +='SoftwareSerial mySerial(' + bt_device + ',' +  eval(parseInt(bt_device) + 1) + '); // RX, TX \n';
        setup   +='mySerial.begin(9600);\n';
        if (msg == "''")
          code +='String msg = "";\n';
        else
          code +='String msg = String(' + msg + ');\n';
        code +='const char* payload = msg.c_str();\n';
        code +='mySerial.write(payload);\n';
    }else if (Blockly.Arduino.wokwi_device == 'esp32dev'){
        include +='#include <BluetoothSerial.h>\n';
        defi    +='BluetoothSerial SerialBT;\n';
        setup   +='SerialBT.begin(' + name + ');\n';
        if (msg == "''")
          code +='String msg = "";\n';
        else
          code +='String msg = String(' + msg + ');\n';
        code +='const char* payload = msg.c_str();\n';
        code +='SerialBT.print(payload);\n';
    }
    else {}
    Blockly.Arduino.definitions_['define_bt'] = include;
    Blockly.Arduino.definitions_['var_bt'] = defi;
    Blockly.Arduino.setups_['setup_bt'] = setup;
    return code;
  };