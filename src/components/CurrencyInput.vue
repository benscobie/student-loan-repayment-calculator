<template>
  <input
    ref="inputRef"
    :value="formattedValue"
  >
</template>

<script>
import useCurrencyInput from 'vue-currency-input'

export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
  },
  setup(props) {
    const { formattedValue, inputRef } = useCurrencyInput({
      currency: 'GBP',
      currencyDisplay: 'hidden',
      precision: 0,
      hideGroupingSeparatorOnFocus: false,
      valueRange: { min: 0, max: 10000000 },
      exportValueAsInteger: true,
    })

    return { inputRef, formattedValue }
  },
}
</script>
