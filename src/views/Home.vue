<template>
  <div class="home">
    <p class="text-muted">Disclaimer: This calculator does not constitute financial advice.</p>
    <Calculator/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calculator from '../components/Calculator.vue';

export default defineComponent({
  components: {
    Calculator
  },
})
</script>
