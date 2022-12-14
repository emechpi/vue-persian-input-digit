'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _vue2.default.directive('input-digit', {
    update: function update(el, binding) {
        var element = el.tagName === 'INPUT' ? el : el.querySelector('input');
        var event = new Event('input', { bubbles: true });
        var block = binding.value && binding.value.block ? binding.value.block : null;
        var delimiter = binding.value && binding.value.delimiter ? binding.value.delimiter : null;
        var delimiterRgx = new RegExp(delimiter, 'g');
        if (element.value) {
            var elementValue = block && delimiter ? element.value.toString().replace(delimiterRgx, '') : element.value.toString();
            if (elementValue.length === 1) {
                element.value = testCharacter(elementValue) ? toEnNumber(elementValue) : '';
            } else {
                var previousValue = elementValue.substring(0, elementValue.length - 1);
                var latestCharacter = elementValue.substring(elementValue.length - 1, elementValue.length);
                var convertedValue = toEnNumber(testCharacter(latestCharacter) ? elementValue : previousValue);
                element.value = block && delimiter ? addDelimiter(convertedValue, block, delimiter) : convertedValue;
            }
            if (binding.value.postfix) {
                element.value = addPostfix(element.value, binding.value.postfix);
            }
            if (binding.value.prefix) {
                element.value = addPrefix(element.value, binding.value.prefix);
            }
        }
        element.dispatchEvent(event);
    }
});


function testCharacter(char) {
    var numberPattern = /^[0123456789۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩]+$/;
    return numberPattern.test(char);
}
function addDelimiter(str, size) {
    var delimiter = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var rgx = '\\B(?=(\\d{' + size + '})+(?!\\d))';
    var replacementRgx = new RegExp(rgx, 'g');
    return str.toString().replace(replacementRgx, delimiter);
}
function toEnNumber(number) {
    var toEn = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
        '٠': '0',
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9'
    };
    var str = String(number);
    var enStr = Array.from(str).reduce(function (prev, curr) {
        return '' + prev + (toEn[curr] || curr);
    }, '');
    return enStr;
}

function addPrefix(str, prefix) {
    return prefix + ' ' + str;
}
function addPostfix(str, postfix) {
    return str + ' ' + postfix;
}