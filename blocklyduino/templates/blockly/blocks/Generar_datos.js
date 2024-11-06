// Definición del bloque para JSON
Blockly.Blocks['variables_json'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Introducir los campos que queremos:");
        this.appendStatementInput("variables_contenido")
            .setCheck(null);
        this.setInputsInline(true);
        this.setOutput(true, "String");
        this.setColour(230);
        this.setHelpUrl("");
    }
};

// Definición del bloque para partes de JSON
Blockly.Blocks['variables_partes'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("\"")
            .appendField(new Blockly.FieldTextInput("key"), "KEY")
            .appendField("\"");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(240);
        this.setTooltip("Par clave-valor en JSON");
        this.setHelpUrl("");
    }
};