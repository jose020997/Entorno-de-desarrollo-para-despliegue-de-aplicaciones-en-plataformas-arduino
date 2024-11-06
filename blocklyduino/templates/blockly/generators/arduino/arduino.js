Blockly.Arduino.arduino = function () {
    var device = this.getFieldValue("DEVICE");
    
    var librerias = '';
    var definiciones = '';
    var setup = "";
    var loop = "";


    Blockly.Arduino.definitions_['define_arduino'] = librerias;
    Blockly.Arduino.definitions_['variables_arduino'] = definiciones;
    Blockly.Arduino.setups_['setup_arduino'] = setup;
    
    return loop;
};