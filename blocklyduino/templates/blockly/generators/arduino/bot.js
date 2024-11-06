/**
 * @fileoverview Network functions
 * @author zmh@red.ujaen.es)
 */


goog.provide('Blockly.Arduino.bot');

goog.require('Blockly.Arduino');

/* Telegram Bot
*/
Blockly.Arduino.bot_telegram = function() {
  var token = Blockly.Arduino.valueToCode(this, 'TOKEN',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  var branch = Blockly.Arduino.statementToCode(this, 'CALLBACK');

  var define_bot = '#include <WiFiClientSecure.h>\n#include <UniversalTelegramBot.h>\n\n' +
                   '// Telegram token\n' +
                   '#define BOTtoken ' + token + '\n\n'+
                   '// New secure client\n' +
                   'WiFiClientSecure client;\n\n' +
                   '// New bot\n' +
                   'UniversalTelegramBot bot(BOTtoken, client);\n\n' +
                   '// Search for new messages, period=1000ms\n' +
                   'int botRequestDelay = 1000;\n' +
                   'unsigned long lastTimeBotRan;\n' +
                   'bool bandera = false;\n' +
                   'String chat_id, message, from_name;\n\n' +
                   'void handleNewMessages(int numNewMessages) {\n' +
                   '  for (int i=0; i<numNewMessages; i++) {\n' +
                   '    chat_id = String(bot.messages[i].chat_id);\n' +
                   '    message = bot.messages[i].text;\n\n' +
                   '    from_name = bot.messages[i].from_name;\n' +
                   '    if (from_name == "") from_name = "Guest";\n\n' +
                   branch +
                   '  }\n' +
                   '}\n\n';

  if (Blockly.Arduino.wokwi_device == 'unowifi'){
    Blockly.Arduino.definitions_['define_bot'] = define_bot;
  }
  if (Blockly.Arduino.wokwi_device == 'esp'){
    Blockly.Arduino.definitions_['define_bot'] = define_bot;
  }
  if (Blockly.Arduino.wokwi_device == 'open'){
    Blockly.Arduino.definitions_['define_bot'] = define_bot;
  }

 var code = ''

 if (Blockly.Arduino.wokwi_device != 'ino'){
  Blockly.Arduino.definitions_['var_bot'] = '\n';
  var setup = 'client.setCACert(TELEGRAM_CERTIFICATE_ROOT);\n' +
              '  configTime(0, 0, "pool.ntp.org"); // get UTC time via NTP\n';

  Blockly.Arduino.setups_['setup_bot'] = setup;
  code += 'if (millis() > lastTimeBotRan + botRequestDelay)  {\n' +
         '  int numNewMessages = bot.getUpdates(bot.last_message_received + 1);\n' +
         '  while(numNewMessages) {\n' +
         '    handleNewMessages(numNewMessages);\n' +
         '    numNewMessages = bot.getUpdates(bot.last_message_received + 1);\n' +
         '  }\n' +
         '  lastTimeBotRan = millis();\n' +
         '}\n';
  }
  return code;
};

/* Bot message
*/
Blockly.Arduino.bot_message = function() {
  var message = Blockly.Arduino.valueToCode(this, 'MESSAGE',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';
  var send = Blockly.Arduino.valueToCode(this, 'SEND',
  Blockly.Arduino.ORDER_UNARY_POSTFIX) || '\'\'';

  var branch = Blockly.Arduino.statementToCode(this, 'CALLBACK');

  var defi ='';
  var setup ='';
  var code ='';
  if (Blockly.Arduino.wokwi_device != 'ino'){

    code = '  if (message == ' + message + ') {\n' +
           '  ' + branch +
           '    bot.sendMessage(chat_id, ' + send + ', "Markdown");\n' +
           '    bandera = true;\n' +
           '  }\n';

  }
  return code;
};

