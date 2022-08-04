<template>
  <input
    ref="inputRef"
    :value="formattedValue"
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CurrencyDisplay, useCurrencyInput, ValueScaling } from "vue-currency-input";

export default defineComponent({
  name: 'CurrencyInput',
  props: {
    modelValue: Number, // Vue 2: value
  },
  setup() {
    const { formattedValue, inputRef } = useCurrencyInput({
      currency: 'GBP',
      currencyDisplay: CurrencyDisplay.hidden,
      precision: 0,
      hideGroupingSeparatorOnFocus: false,
      valueRange: { min: 0, max: 10000000 },
      valueScaling: ValueScaling.precision,
    })

    return { inputRef, formattedValue }
  },
})
</script>
