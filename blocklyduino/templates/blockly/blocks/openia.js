Blockly.Blocks['openia'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://static.vecteezy.com/system/resources/previews/024/558/807/non_2x/openai-chatgpt-logo-icon-free-png.png", 50, 50, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Conexión ChatGPT");
      this.appendDummyInput();
      this.appendValueInput("bared")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Token Autenticación");
      this.appendValueInput("pregunta")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Pregunta");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(225);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };