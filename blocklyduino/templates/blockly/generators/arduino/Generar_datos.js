Blockly.Arduino['variables_json'] = function(block) {
    var statements = Blockly.Arduino.statementToCode(block, 'variables_contenido');
    
    // Eliminar espacios adicionales y comas al final
    statements = statements.trim();
    if (statements.endsWith(',')) {
        statements = statements.slice(0, -1);
    }
    
    var code = '{' + statements + '}';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// Generación del código para el bloque partes de JSON
Blockly.Arduino['variables_partes'] = function(block) {
    var key = block.getFieldValue('KEY');
    var code = '"' + key + '"';
    return code + ',';
};