import Vue from 'vue'
export default Vue.directive('input-digit', {
    update(el, binding) {
        const element = el.tagName === 'INPUT' ? el : el.querySelector('input')
        const event = new Event('input', { bubbles: true })
        const block =
            binding.value && binding.value.block ? binding.value.block : null
        const delimiter =
            binding.value && binding.value.delimiter ? binding.value.delimiter : null
        const delimiterRgx = new RegExp(delimiter, 'g')
        if (element.value) {
            let elementValue =
                block && delimiter
                    ? element.value.toString().replace(delimiterRgx, '')
                    : element.value.toString()
            const previousValue = elementValue.substring(
                0,
                elementValue.toString().length - 1
            )
            const latestCharacter = elementValue.substring(
                elementValue.length - 1,
                elementValue.length
            )
            const convertedValue = toEnNumber(
                testCharacter(latestCharacter) ? elementValue : previousValue
            )
            element.value =
                block && delimiter
                    ? addDelimiter(convertedValue, block, delimiter)
                    : convertedValue
        }
        element.dispatchEvent(event)
    }
})

function testCharacter(char) {
    const numberPattern = /^[0123456789۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩]+$/
    return numberPattern.test(char)
}
function addDelimiter(str, size, delimiter = '') {
    const rgx = `\\B(?=(\\d{${size}})+(?!\\d))`
    const replacementRgx = new RegExp(rgx, 'g')
    return str.toString().replace(replacementRgx, delimiter)
}
function toEnNumber(number) {
    const toEn = {
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
        '٩': '9',
    }
    const str = String(number)
    const enStr = Array.from(str).reduce(
        (prev, curr) => `${prev}${toEn[curr] || curr}`,
        ''
    )
    return enStr
}
