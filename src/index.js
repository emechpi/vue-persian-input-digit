import Vue from 'vue'
export default Vue.directive('input-digit', {
    update(el, binding) {
        const element = el.tagName === 'INPUT' ? el : el.querySelector('input')
        const event = new Event('input', { bubbles: true })
        const isPrice = binding.value === 'price'
        if (element.value) {
            let elementValue = isPrice
                ? element.value.toString().replace(/,/g, '')
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
            element.value = isPrice ? addSeparator(convertedValue) : convertedValue
        }
        element.dispatchEvent(event)
    }
})

function testCharacter(char) {
    const numberPattern = /^[0123456789۰۱۲۳۴۵۶۷۸۹]+$/
    return numberPattern.test(char)
}
function addSeparator(str) {
    return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
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
        '۹': '9'
    }
    const str = String(number)
    const enStr = Array.from(str).reduce(
        (prev, curr) => `${prev}${toEn[curr] || curr}`,
        ''
    )
    return enStr
}
