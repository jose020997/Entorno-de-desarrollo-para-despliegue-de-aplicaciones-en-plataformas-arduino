Blockly.Blocks['network_bt_esp32'] = {
    helpUrl: "",
    init: function () {
        this.setColour(30);
        this.appendDummyInput()
            .appendField("Bluetooth Send")
            .appendField(new Blockly.FieldImage("https://i.pinimg.com/originals/ce/67/c3/ce67c34e0015a33b5e4f08f520a84882.png", 64, 64))
            .appendField("PIN#")
            .appendField(new Blockly.FieldDropdown(profile["default"].digital), "PIN");
        this.appendValueInput("NAME", "String").setAlign(Blockly.ALIGN_RIGHT).appendField("BT Name");
        this.appendValueInput("MESSAGE", "String").setAlign(Blockly.ALIGN_RIGHT).appendField("message");
        this.setPreviousStatement(!0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("Send message to Bluetooth.");
    }
};
