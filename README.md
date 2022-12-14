`vue-persian-input-digit` - a simple, Vue.js directive for persian and arabic input digit.

### Usage
- Prevent non-digit characters (just digit numbers 0-9)
- Convert Arabic and Persian numbers in input to English digit
- Add separator to input value\
    eg: \
        - thousand separator: 120000000 => 120,000,000 \
        - credit card format: 6219861012345678 => 6219-8610-1234-5678
### Installation

npm:
```bash
npm install vue-persian-input-digit --save
```

yarn:
```bash
yarn add vue-persian-input-digit --save
```

### Use

 1. in this case just add ```v-input-digit``` as a directive on element.\
 this usage prevent user to enter non-digit values and just accept numeric values.\
 and also convert Persian or Arabic digits to English digits in input.

```html
<template>
  <div>
    <input type="text" v-input-digit />
  </div>
</template>

<script>
import VueInputDigit from 'vue-persian-input-digit'

export default {
  directives: {
    VueInputDigit
  },
  data() {
      return {
          value: '۱۰۰۰۰۰۰' // formatted value => '1000000'
      }
  }
}
</script>
```

 2. in this case you can add ```v-input-digit={ block: number, delimiter: string }``` as a directive on element.
>```block```: A Number value that will insert delimiters in between these groups.\
```delimiter```: A String value indicates the delimiter to use in formatting.
```js
    v-input-digit={ block: 3, delimiter: ',' } //150230000 => 150,230,000
```
```js
    v-input-digit={ block: 2, delimiter: '/' } //990525 => 99/05/25
```
```js
    v-input-digit={ block: 4, delimiter: '-' } //6219861012345678 => 6219-8610-1234-5678
```


```html
<template>
  <div>
    <input type="text" v-model="value" v-input-digit="{ block: 3, delimiter: ',' }" />
  </div>
</template>

<script>
import VueInputDigit from 'vue-persian-input-digit'

export default {
  directives: {
    VueInputDigit
  },
  data() {
    return {
        value: 2500000 // formatted value => 2,500,000
    }
  }
}
</script>
```


2. you can add ```postfix``` and ```prefix``` to input value.
you should set binding values like this : ```v-input-digit={ postfix: string, prefix: string }```.
>```postfix```: A String value that will append after the input value.\
```prefix```: A String value that will append before the input value.
```js
    v-input-digit={ block: 3, delimiter: ',', postfix: 'تومان' } //150230000 =>   150,230,000 تومان 
```
```js
    v-input-digit={ postfix: 'متر' } //152 =>  152 متر
```
```js
    v-input-digit={ prefix: 'سال' } //1395 => سال 1395
```
