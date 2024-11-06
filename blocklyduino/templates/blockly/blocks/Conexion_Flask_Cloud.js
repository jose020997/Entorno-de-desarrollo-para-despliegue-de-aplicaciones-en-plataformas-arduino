/**
 * @fileoverview Genera un bloque personalizado para conectar con Google Cloud.
 * @author jabg0014@red.ujaen.es
 * Jose Antonio Barrios Garcia
 * https://es.linkedin.com/in/joseantonio-barrios-garcia
 */

goog.provide('Blockly.Blocks.tutorial');

goog.require('Blockly.Blocks');

Blockly.Blocks['conexion_googlecloud'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-cloud-icon-vector-PNG.png", 50, 50, { alt: "*", flipRtl: false }))
        .appendField("Realizacion Pub hacia Google Cloud");
    this.appendValueInput("Dire")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Direccion");
    this.appendValueInput("Puer")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Puerto");        
    this.appendValueInput("Endp")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Endpoint");
    this.appendValueInput("Topi")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Topic");
    this.appendValueInput("valo")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Valores");
    this.appendValueInput("TiempoRefresco")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("Tiempo de Refresco (ms)");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
    this.setTooltip("Bloque para realizar publicacion hacia Google Cloud");
    this.setHelpUrl("");
  }
};
