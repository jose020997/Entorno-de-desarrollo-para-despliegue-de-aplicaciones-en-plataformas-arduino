/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Arduino for text blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino.texts');

goog.require('Blockly.Arduino');


Blockly.Arduino.text = function() {
  // Text value.
  var code = Blockly.Arduino.quote_(this.getFieldValue('TEXT'));
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['text_join'] = function (block) {
    // Create a string made up of any number of elements of any type.
    switch (block.itemCount_) {
        case 0:
            return ['\'\'', Blockly.Arduino.ORDER_ATOMIC];
        case 1:
            var element = Blockly.Arduino.valueToCode(block, 'ADD0',
                    Blockly.Arduino.ORDER_NONE) || '\'\'';
            var code = element;
            return [code, Blockly.Arduino.ORDER_FUNCTION_CALL];
        default:
            var elements = new Array(block.itemCount_);
            for (var i = 0; i < block.itemCount_; i++) {
                elements[i] = (Blockly.Arduino.valueToCode(block, 'ADD' + i,
                        Blockly.Arduino.ORDER_ADDITIVE) + ' + ') || '\'\'';
            }
            var code = elements.join('');
            code = code.substring(0, code.length - 3);
            // code = code.slice(0, code.lenght-3);
            return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
};

Blockly.Arduino['text_append'] = function (block) {
    // Append to a variable in place.
    var varName = Blockly.Arduino.variableDB_.getName(
            block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
    var value = Blockly.Arduino.valueToCode(block, 'TEXT',
            Blockly.Arduino.ORDER_NONE) || '\'\'';
    return varName + ' = String(' + varName + ') + String(' + value + ');\n';
};

Blockly.Arduino['text_length'] = function (block) {
    // String or array length.
    var text = Blockly.Arduino.valueToCode(block, 'VALUE',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    return [text + '.length()', Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['text_isEmpty'] = function (block) {
    // Is the string null or array empty?
    var text = Blockly.Arduino.valueToCode(block, 'VALUE',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    return ['!' + text + '.length()', Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['text_indexOf'] = function (block) {
    // Search the text for a substring.
    var operator = block.getFieldValue('END') == 'FIRST' ?
            'indexOf' : 'lastIndexOf';
    var substring = Blockly.Arduino.valueToCode(block, 'FIND',
            Blockly.Arduino.ORDER_NONE) || '\'\'';
    var text = Blockly.Arduino.valueToCode(block, 'VALUE',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var code = text + '.' + operator + '(' + substring + ')';
    // Adjust index if using one-based indices.
    if (block.workspace.options.oneBasedIndex) {
        return [code + ' + 1', Blockly.Arduino.ORDER_ADDITION];
    }
    return [code, Blockly.Arduino.ORDER_NONE];
};




Blockly.Arduino['text_getSubstring'] = function (block) {
    // String or array length.
    var code = '';
    var text = Blockly.Arduino.valueToCode(block, 'STRING',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var where1 = block.getFieldValue('WHERE1');
    var where2 = block.getFieldValue('WHERE2');
    var v1 = Blockly.Arduino.valueToCode(block, 'AT1',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    var v2 = Blockly.Arduino.valueToCode(block, 'AT2',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
    if (where1 == 'FROM_START' && where2 == 'FROM_END')
        code = text + '.substring(' + v1 + ',' + v2 +  ')';
    return [code, Blockly.Arduino.ORDER_NONE];
};

Blockly.Arduino['text_changeCase'] = function (block) {
    // String or array length.
    var operator;
    var text =  block.getFieldValue('CASE');
    if (text == 'UPPERCASE') operator = '.toUpperCase()';
    if (text == 'LOWERCASE') operator = '.toLowerCase()';
    var v1 = Blockly.Arduino.valueToCode(block, 'TEXT',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
     var code = v1 + operator + ";\r\n"
    return code;
};

Blockly.Arduino['text_trim'] = function (block) {
    // String or array length.
    var v1 = Blockly.Arduino.valueToCode(block, 'TEXT',
            Blockly.Arduino.ORDER_ATOMIC) || '\'\'';
     var code = v1 + ".trim();\r\n";
    return code;
};