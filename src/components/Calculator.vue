<template>
  <div class="row">
    <div class="col-5">
      <h3>Your Details</h3>
      <form>
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="grossSalary">Annual salary before tax</label>
              <div class="input-group">
                <div class="input-group-prepend">
                  <span class="input-group-text">£</span>
                </div>
                <currency-input id="grossSalary" class="form-control" placeholder="25000.00" v-model="grossSalary" />
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="planType">Loan type</label>
              <select class="form-control" v-model="selectedPlanType">
                <option :value="1">Type 1</option>
                <option :value="2">Type 2</option>
                <option :value="3">Type 1 & Type 2</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="planType & PlanFlags.Type1">
          <h4>Type 1 Loan Details</h4>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="type1BalanceRemaining">Balance remaining</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">£</span>
                  </div>
                  <currency-input id="type1BalanceRemaining" class="form-control" placeholder="10000.00" v-bind:precision="2" v-model="type1BalanceRemaining" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="type1InterestRate">Interest rate</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="type1InterestRate" placeholder="1.5" v-model="type1InterestRate">
                  <div class="input-group-append">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="planType & PlanFlags.Type2">
          <h4>Type 2 Loan Details</h4>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="type2BalanceRemaining">Balance remaining</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text">£</span>
                  </div>
                  <currency-input id="type2BalanceRemaining" class="form-control" placeholder="10000.00" v-bind:precision="2" v-model="type2BalanceRemaining" />
                </div>
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="type2InterestRate">Interest rate</label>
                <div class="input-group">
                  <input type="text" class="form-control" id="type2InterestRate" placeholder="6" v-model="type2InterestRate">
                  <div class="input-group-append">
                    <span class="input-group-text">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h4>Advanced Options</h4>
        <div v-if="planType & PlanFlags.Type1">
          <div class="form-group">
            <label for="type1RepaymentThreshold">Type 1 repayment threshold</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">£</span>
              </div>
              <currency-input id="type1RepaymentThreshold" class="form-control" v-model="type1RepaymentThreshold" />
            </div>
          </div>
        </div>

        <div v-if="planType & PlanFlags.Type2">
          <div class="form-group">
            <label for="type2RepaymentThreshold">Type 2 repayment threshold</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">£</span>
              </div>
              <currency-input id="type2RepaymentThreshold" class="form-control" v-model="type2RepaymentThreshold" />
            </div>
          </div>
        </div>
        <button class="btn btn-primary" v-on:click.stop.prevent="calculate">
          Calculate
        </button>
      </form>
    </div>
    <div class="col-7">
      <h3>Results</h3>

      <loan-breakdown-table v-if="calculatorResult != null" v-bind:calculator-result="calculatorResult"></loan-breakdown-table>
      <!-- <loan-breakdown-chart v-if="calculatorResult != null"></loan-breakdown-chart> -->
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-bitwise */
/* eslint-disable class-methods-use-this */

import { Options, Vue } from 'vue-class-component';
import LoanCalculatorService from '@/calculators/loanCalculatorService';
import LoanDescription from '@/calculators/loanDescription';
import LoanType from '@/calculators/loanType';
import LoanBreakdownChart from '@/components/LoanBreakdownChart.vue';
import LoanBreakdownTable from '@/components/LoanBreakdownTable.vue';
import CurrencyInput from '@/components/CurrencyInput.vue'
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import LoanBreakdown from '@/calculators/loanBreakdown';

enum PlanFlags {
    Type1 = 1 << 0,
    Type2 = 1 << 1,
}

@Options({
  components: { LoanBreakdownChart, LoanBreakdownTable, CurrencyInput },
})
export default class Calculator extends Vue {
  selectedPlanType = 1;

  calculatorResult: LoanCalculationResult = new LoanCalculationResult(0, new Array<LoanBreakdown>());

  get planType(): PlanFlags {
    if (this.selectedPlanType === 1) {
      return PlanFlags.Type1;
    } if (this.selectedPlanType === 2) {
      return PlanFlags.Type2;
    }

    return PlanFlags.Type1 | PlanFlags.Type2;
  }

  // TODO Move to a loan definitions class
  grossSalary = 50000;

  type1BalanceRemaining = 7000;

  type1InterestRate = 1.5;

  type1RepaymentThreshold = 19390;

  type2BalanceRemaining = 5000;

  type2InterestRate = 5.34;

  type2RepaymentThreshold = 26575;

  PlanFlags = PlanFlags;

  calculate() {
    const plans: LoanDescription[] = [];

    if (this.planType & PlanFlags.Type1) {
      plans.push(new LoanDescription(this.type1BalanceRemaining, this.type1InterestRate, this.type1RepaymentThreshold, LoanType.Type1));
    }

    if (this.planType & PlanFlags.Type2) {
      plans.push(new LoanDescription(this.type2BalanceRemaining, this.type2InterestRate, this.type2RepaymentThreshold, LoanType.Type2));
    }

    this.calculatorResult = LoanCalculatorService.calculate({ grossSalary: this.grossSalary, loanDescriptions: plans, yearlySalaryIncrease: 0 });
  }
}
</script>

<style scoped lang="scss">
  .w-40 {
    width: 40%;
  }

  .w-20 {
    width: 20%;
  }
</style>
