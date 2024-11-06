/**
 * @fileoverview Genera un bloque personalizado para conectar con Google Cloud.
 * @author jabg0014@red.ujaen.es
 * Jose Antonio Barrios Garcia
 * https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

goog.provide('Blockly.Blocks.tutorial');

goog.require('Blockly.Blocks');


Blockly.Blocks['delay'] = {
    init: function() {
      this.appendDummyInput()
          .appendField(new Blockly.FieldImage("https://www.shutterstock.com/image-vector/wall-clock-doodle-style-7-600nw-1759825841.jpg", 50, 50, { alt: "*", flipRtl: "FALSE" }))
          .appendField("Timer");
      this.appendValueInput("NAME")
          .setCheck(null)
          .setAlign(Blockly.ALIGN_RIGHT)
          .appendField("delay:");
      this.setPreviousStatement(true, null);
      this.setColour(20);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };