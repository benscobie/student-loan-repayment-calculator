<template>
  <table class="table table-bordered">
    <thead class="thead-light">
    <th scope="col" class="w-40">&nbsp;</th>
    <th scope="col" class="w-20">Type 1</th>
    <th scope="col" class="w-20">Type 2</th>
    <th scope="col" class="w-20">Total</th>
    </thead>
    <tbody>
    <tr>
      <th scope="row">Interest to pay on balances</th>
      <td>{{ formatMoney(loanOneBreakdown.totalInterestPaid) }}</td>
      <td>{{ formatMoney(loanTwoBreakdown.totalInterestPaid) }}</td>
      <td>{{ formatMoney(loanOneBreakdown.totalInterestPaid + loanTwoBreakdown.totalInterestPaid) }}</td>
    </tr>
    <tr>
      <th scope="row">Total payment remaining</th>
      <td>{{ formatMoney(loanOneBreakdown.totalPaid) }}</td>
      <td>{{ formatMoney(loanTwoBreakdown.totalPaid) }}</td>
      <td>{{ formatMoney(loanOneBreakdown.totalPaid + loanTwoBreakdown.totalPaid) }}</td>
    </tr>
    <tr>
      <th scope="row">Years remaining</th>
      <td>{{ (loanOneBreakdown.period / 12 ).toFixed(2) }}</td>
      <td>{{ (loanTwoBreakdown.period / 12 ).toFixed(2) }}</td>
      <td>{{ Math.max((loanOneBreakdown.period / 12 ), (loanTwoBreakdown.period / 12 )) }}</td>
    </tr>
    </tbody>
  </table>
</template>
<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import LoanBreakdown from '@/calculators/loanBreakdown';
import LoanCalculationResult from '@/calculators/loanCalculationResult';

@Options({
  props: {
    calculatorResult: LoanCalculationResult,
  },
})
export default class LoanBreakdownTable extends Vue {
  readonly calculatorResult!: LoanCalculationResult

  get loanOneBreakdown(): LoanBreakdown {
    if (this.calculatorResult.loanOneBreakdowns.length === 0) {
      return new LoanBreakdown(0, 0, 0, 0, 0, 0, 0)
    }

    return this.calculatorResult.loanOneBreakdowns.slice(-1)[0];
  }

  get loanTwoBreakdown(): LoanBreakdown {
    if (this.calculatorResult.loanTwoBreakdowns.length === 0) {
      return new LoanBreakdown(0, 0, 0, 0, 0, 0, 0)
    }

    return this.calculatorResult.loanTwoBreakdowns.slice(-1)[0];
  }
}
</script>
