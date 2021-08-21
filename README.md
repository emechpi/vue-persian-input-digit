`vue-persian-input-digit` - a simple, Vue.js directive for persian input digit.

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

```html
<template>
  <div>
    <input type="text" v-input-digit="number" />
  </div>
</template>

<script>
import VueInputDigit from 'vue-persian-input-digit'

export default {
  directives: {
    VueInputDigit
  }
}
</script>
```