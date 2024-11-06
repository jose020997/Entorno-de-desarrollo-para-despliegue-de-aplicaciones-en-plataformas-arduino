Blockly.Blocks['mysql_insert_flask'] = {
    init: function() {
        this.appendDummyInput()
            .appendField(new Blockly.FieldImage("https://w7.pngwing.com/pngs/747/798/png-transparent-mysql-logo-mysql-database-web-development-computer-software-dolphin-marine-mammal-animals-text.png", 50, 50, { alt: "*", flipRtl: "FALSE" }))
            .appendField("Conexion MySQL Insert Flask Plantilla                 ");
        this.appendDummyInput();
        this.appendValueInput("Dflask")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Dirección Servicio");
        this.appendValueInput("DBD")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Dirección Base de Datos");
        this.appendValueInput("user")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Usuario");
        this.appendValueInput("pass")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Contraseña");
        this.appendValueInput("NombreBD")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Nombre Base de Datos");
        this.appendDummyInput()
            .appendField(new Blockly.FieldDropdown([["Campo - temperatura","temperatura"], ["Campo - humedad","humedad"], ["Campo - viento","viento"]]), "tabla")
            .setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("valor")
            .setCheck(null)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendField("Valor");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(345);
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
