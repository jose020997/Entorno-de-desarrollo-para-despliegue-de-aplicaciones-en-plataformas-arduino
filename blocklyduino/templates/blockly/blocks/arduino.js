Blockly.Blocks.arduino = {
    helpUrl: "",
    init: function () {
        this.setColour(90);

        // Inicializa la imagen y el dropdown
        this.appendDummyInput()
            .appendField("Project")
            .appendField(new Blockly.FieldImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQItmQWAxp4OV29rhE_pesUWy06fElq8Sqh3MmMqbPTLlIYERX3F3f4l_SeeNIPFojQQM8&usqp=CAU", 64, 64, "*", this.updateImage.bind(this)))
            .appendField("Device")
            .appendField(
                new Blockly.FieldDropdown(
                    [
                        ["Arduino UNO", "ino"],
                        ["Arduino ESP32", "esp"],
                    ],
                    this.updateImage.bind(this)
                ),
                "DEVICE"
            );

        // Establece las conexiones anteriores y siguientes
        this.setPreviousStatement(0, null);
        this.setNextStatement(!0, null);
        this.setTooltip("Open wokwi project.");
    },

    // Método para actualizar la imagen
    updateImage: function () {
        var device = this.getFieldValue('DEVICE');
        var imageUrl = "";

        // Selecciona la URL de la imagen basada en el valor seleccionado
        switch (device) {
            case "ino":
                imageUrl = "https://es.farnell.com/productimages/large/es_ES/2285200-40.jpg";  // Cambia esta URL a la imagen correspondiente
                break;
            case "esp":
                imageUrl = "https://www.az-delivery.de/cdn/shop/products/esp32-nodemcu-module-wlan-wifi-development-board-mit-cp2102-nachfolgermodell-zum-esp8266-kompatibel-mit-arduino-540512.jpg?v=1679400491&width=1500";  // Cambia esta URL a la imagen correspondiente
                break;
            default:
                imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQItmQWAxp4OV29rhE_pesUWy06fElq8Sqh3MmMqbPTLlIYERX3F3f4l_SeeNIPFojQQM8&usqp=CAU";
                break;
        }

        // Actualiza la imagen en el bloque
        var imageField = this.getField('IMAGE');
        if (imageField) {
            imageField.setValue(imageUrl);
        }
    }
};

// Inicializa el bloque y establece el nombre del campo de la imagen para referencia
Blockly.Blocks.wokwi_open_project.init = function () {
    this.setColour(90);
    this.appendDummyInput()
        .appendField("Project")
        .appendField(new Blockly.FieldImage("https://avatars.githubusercontent.com/u/56967200", 64, 64, "*", this.updateImage.bind(this)), "IMAGE")
        .appendField("Device")
        .appendField(
            new Blockly.FieldDropdown(
                [
                    ["Arduino UNO", "ino"],
                    ["Arduino ESP32", "esp"],
                ],
                this.updateImage.bind(this)
            ),
            "DEVICE"
        );

    this.appendValueInput("TEXT", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField("Wokwi project");
    this.appendValueInput("AGENT", "String").setCheck("String").setAlign(Blockly.ALIGN_RIGHT).appendField("Agent address");
    this.setPreviousStatement(0, null);
    this.setNextStatement(!0, null);
    this.setTooltip("Open wokwi project.");
};
