<template>
  <table class="table table-bordered">
    <thead class="thead-light">
      <tr>
        <th scope="col" class="w-40">&nbsp;</th>
        <th scope="col" class="w-20">Type 1</th>
        <th scope="col" class="w-20">Type 2</th>
        <th scope="col" class="w-20">Total</th>
      </tr>
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
      <td>{{ Math.max((loanOneBreakdown.period / 12 ), (loanTwoBreakdown.period / 12 )).toFixed(2) }}</td>
    </tr>
    </tbody>
  </table>
</template>
<script lang="ts">

import { Options, Vue } from 'vue-class-component';
import LoanBreakdown from '@/calculators/loanBreakdown';
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import LoanType from '@/calculators/loanType';

@Options({
  props: {
    calculatorResult: LoanCalculationResult,
  },
})
export default class LoanBreakdownTable extends Vue {
  readonly calculatorResult!: LoanCalculationResult

  get loanOneBreakdown(): LoanBreakdown {
    const loanBreakdowns = this.calculatorResult.loanBreakdowns.filter(({ loanType }) => loanType === LoanType.Type1);

    if (loanBreakdowns.length === 0) {
      return new LoanBreakdown(LoanType.Type1, 0, 0, 0, 0, 0, 0, 0)
    }

    return loanBreakdowns.slice(-1)[0];
  }

  get loanTwoBreakdown(): LoanBreakdown {
    const loanBreakdowns = this.calculatorResult.loanBreakdowns.filter(({ loanType }) => loanType === LoanType.Type2);

    if (loanBreakdowns.length === 0) {
      return new LoanBreakdown(LoanType.Type2, 0, 0, 0, 0, 0, 0, 0)
    }

    return loanBreakdowns.slice(-1)[0];
  }
}
</script>
