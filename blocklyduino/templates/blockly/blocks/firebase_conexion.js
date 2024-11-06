/**
 * @fileoverview Genera un bloque personalizado para conectar con Google Cloud.
 * @author jabg0014@red.ujaen.es
 * Jose Antonio Barrios Garcia
 * https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

goog.provide('Blockly.Blocks.tutorial');

goog.require('Blockly.Blocks');


Blockly.Blocks['firebase'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://cdn.icon-icons.com/icons2/691/PNG/512/google_firebase_icon-icons.com_61474.png", 50, 50, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Establacer conexion Firebase");
      this.appendValueInput("host")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("firebase_host");
      this.appendValueInput("auth")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("firebase_auth");
      this.appendValueInput("email")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("email");
      this.appendValueInput("pass")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("clave");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };