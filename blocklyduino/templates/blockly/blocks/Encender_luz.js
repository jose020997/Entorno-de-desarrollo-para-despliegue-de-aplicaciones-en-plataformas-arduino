Blockly.Blocks['encender_led'] = {
  init: function() {
      this.appendDummyInput()
          .appendField("Módulo para encender un LED");
      this.appendValueInput("Pin")
          .setCheck("Number")
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Pin de conexión");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(90);
      this.setTooltip("");
      this.setHelpUrl("");
  }
};