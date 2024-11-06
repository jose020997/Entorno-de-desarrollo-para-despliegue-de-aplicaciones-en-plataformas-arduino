/**
 * @fileoverview Genera un bloque personalizado para conectar con Google Cloud.
 * @author jabg0014@red.ujaen.es
 * Jose Antonio Barrios Garcia
 * https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

 Blockly.Blocks['firebase_lectura'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/691/PNG/512/google_firebase_icon-icons.com_61474.png", 50, 50, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Lectura de datos");
      this.appendValueInput("ntabl")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("Nombre Tabla");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(270);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };