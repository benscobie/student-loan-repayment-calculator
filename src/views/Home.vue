<template>
  <div class="home">
    <p class="text-muted">Disclaimer: This calculator does not constitute financial advice.</p>
    <Calculator/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calculator from '@/components/Calculator.vue'; // @ is an alias to /src

@Component({
  components: {
    Calculator,
  },
})
export default class Home extends Vue {}
</script>
