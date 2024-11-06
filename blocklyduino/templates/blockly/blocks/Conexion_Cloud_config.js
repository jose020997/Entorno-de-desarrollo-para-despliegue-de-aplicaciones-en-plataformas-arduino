/**
	@author jabg0014@red.ujaen.es
	Jose Antonio Barrios Garcia
	https://es.linkedin.com/in/joseantonio-barrios-garcia
 */
 
Blockly.Blocks['cloud_conf'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-cloud-icon-vector-PNG.png", 50, 50, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Google Cloud Conexion ESP32");
      this.appendValueInput("proyecto")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("proyecto");
      this.appendValueInput("topic")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("topic");
      this.appendValueInput("Cliente_email")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("cliente email");
      this.appendValueInput("clave_privada")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("clave privada");
      this.appendValueInput("mensaje")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("mensaje");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(210);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };