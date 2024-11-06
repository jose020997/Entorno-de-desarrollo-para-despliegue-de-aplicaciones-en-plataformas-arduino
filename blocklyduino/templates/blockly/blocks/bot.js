/**
 * @fileoverview Network functions
 * @author zmh@red.ujaen.es)
 */

goog.provide('Blockly.Blocks.bot');

goog.require('Blockly.Blocks');

Blockly.Blocks['bot_telegram'] = {
  helpUrl: 'https://core.telegram.org/bots/features',
  init: function() {
    this.setColour(270);
    this.appendDummyInput()
        .appendField("Telegram Bot")
        .appendField(new Blockly.FieldImage("https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/335_Telegram_logo-512.png", 64, 64))
    this.appendValueInput("TOKEN", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("token")
    this.appendStatementInput("CALLBACK")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("handle new messages");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Telegram bot');
  }
};

Blockly.Blocks['bot_message'] = {
  helpUrl: 'https://core.telegram.org/bots/features',
  init: function() {
    this.setColour(235);
    this.appendDummyInput()
        .appendField("Bot Message")
        .appendField(new Blockly.FieldImage("https://cdn3.iconfinder.com/data/icons/facebook-ui-flat/48/Facebook_UI-22-512.png", 64, 64))
        this.appendValueInput("MESSAGE", 'String')
        .setCheck('String')
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("on message");
    this.appendValueInput("SEND")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("send");
    this.appendStatementInput("CALLBACK")
        .setCheck(null)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField("callback");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip('Handle bot message');
  }
};