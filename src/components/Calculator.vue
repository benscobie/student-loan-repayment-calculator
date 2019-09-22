<template>
  <div class="row">
    <div class="col">
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
                <input type="text" class="form-control" id="grossSalary" placeholder="25000.00" v-model="grossSalary">
              </div>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="planType">Loan type</label>
              <select class="form-control" v-model="selectedPlanType" :change="onPlanTypeChange">
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
                  <input type="text" class="form-control" id="type1BalanceRemaining" placeholder="10000.00" v-model="type1BalanceRemaining">
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
                  <input type="text" class="form-control" id="type2BalanceRemaining" placeholder="15000.00" v-model="type2BalanceRemaining">
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
              <input type="text" class="form-control" id="type1RepaymentThreshold" placeholder="15000.00" v-model="type1RepaymentThreshold">
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
              <input type="text" class="form-control" id="type2RepaymentThreshold" placeholder="15000.00" v-model="type2RepaymentThreshold">
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="col">
      <h3>Results</h3>
      <p>Salary amount eligible for repayments: <strong>{{ formatMoney(salaryEligibleForRepayments) }}</strong></p>

      <table class="table">
        <thead>
          <th scope="col">&nbsp;</th>
          <th scope="col">Yearly</th>
          <th scope="col">Monthly</th>
          <th scope="col">Split</th>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Type 1 payment</th>
            <td>{{ formatMoney(type1YearlyPaymentAmount) }}</td>
            <td>{{ formatMoney(type1MonthlyPaymentAmount) }}</td>
            <td>{{ (payment1SplitPercentage * 100).toFixed(2) }}%</td>
          </tr>
          <tr>
            <th scope="row">Type 2 payment</th>
            <td>{{ formatMoney(type2YearlyPaymentAmount) }}</td>
            <td>{{ formatMoney(type2MonthlyPaymentAmount) }}</td>
            <td>{{ (payment2SplitPercentage * 100).toFixed(2) }}%</td>
          </tr>
          <tr>
            <th scope="row">Total payment</th>
            <td>{{ formatMoney(totalYearlyPaymentAmount) }}</td>
            <td>{{ formatMoney(totalMonthlyPaymentAmount) }}</td>
            <td>&nbsp;</td>
          </tr>
        </tbody>
      </table>

      <table class="table">
        <thead>
          <th scope="col">&nbsp;</th>
          <th scope="col">Type 1</th>
          <th scope="col">Type 2</th>
          <th scope="col">Total</th>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Interest to pay on balances</th>
            <td>{{ formatMoney(type1TotalInterestToPay) }}</td>
            <td>{{ formatMoney(type2TotalInterestToPay) }}</td>
            <td>{{ formatMoney(totalInterestToPay) }}</td>
          </tr>
          <tr>
            <th scope="row">Total payment remaining</th>
            <td>{{ formatMoney(type1TotalPaymentRemaining) }}</td>
            <td>{{ formatMoney(type2TotalPaymentRemaining) }}</td>
            <td>{{ formatMoney(totalPaymentRemaining) }}</td>
          </tr>
          <tr>
            <th scope="row">Years remaining</th>
            <td>{{ type1YearsRemaining.toFixed(2) }}</td>
            <td>{{ type2YearsRemaining.toFixed(2) }}</td>
            <td>{{ totalYearsRemaining.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
/* eslint-disable no-bitwise */

import { Component, Prop, Vue } from 'vue-property-decorator';
import Finance from '../calculators/finance';

enum PlanFlags {
    Type1 = 1 << 0,
    Type2 = 1 << 1,
}

@Component
export default class Calculator extends Vue {
  selectedPlanType: number = 1;

  get planType(): PlanFlags {
    if (this.selectedPlanType === 1) {
      return PlanFlags.Type1;
    } if (this.selectedPlanType === 2) {
      return PlanFlags.Type2;
    }

    return PlanFlags.Type1 | PlanFlags.Type2;
  }

  grossSalary: number = 50000;

  type1BalanceRemaining: number = 7000;

  type1InterestRate: number = 1.5;

  type1RepaymentThreshold: number = 18935;

  type2BalanceRemaining: number = 5000;

  type2InterestRate: number = 5.34;

  type2RepaymentThreshold: number = 25725;

  PlanFlags = PlanFlags;

  get type1BalanceRemainingForCalc() {
    if (~this.planType & PlanFlags.Type1) {
      return 0;
    }

    return this.type1BalanceRemaining;
  }

  get type2BalanceRemainingForCalc() {
    if (~this.planType & PlanFlags.Type2) {
      return 0;
    }

    return this.type2BalanceRemaining;
  }

  get type1InterestRateDecimal(): number {
    return this.type1InterestRate / 100;
  }

  get type2InterestRateDecimal(): number {
    return this.type2InterestRate / 100;
  }

  get salaryEligibleForRepayments(): number {
    if (this.grossSalary <= this.type1RepaymentThreshold) {
      return 0;
    }

    return (this.grossSalary - this.type1RepaymentThreshold);
  }

  get totalYearlyPaymentAmount(): number {
    return this.salaryEligibleForRepayments * 0.09;
  }

  get totalMonthlyPaymentAmount(): number {
    return this.totalYearlyPaymentAmount / 12;
  }

  get type1MonthlyPaymentAmount(): number {
    return this.totalMonthlyPaymentAmount * this.payment1SplitPercentage;
  }

  get type1YearlyPaymentAmount(): number {
    return this.totalYearlyPaymentAmount * this.payment1SplitPercentage;
  }

  get type2MonthlyPaymentAmount(): number {
    return this.totalMonthlyPaymentAmount * this.payment2SplitPercentage;
  }

  get type2YearlyPaymentAmount(): number {
    return this.totalYearlyPaymentAmount * this.payment2SplitPercentage;
  }

  get payment1SplitPercentage(): number {
    if (~this.planType & PlanFlags.Type1) {
      return 0;
    }

    if (this.planType & PlanFlags.Type2 && this.grossSalary > this.type2RepaymentThreshold) {
      return ((this.type2RepaymentThreshold - this.type1RepaymentThreshold) / this.salaryEligibleForRepayments);
    }

    return 1;
  }

  get payment2SplitPercentage(): number {
    if (~this.planType & PlanFlags.Type2) {
      return 0;
    }

    if (this.grossSalary > this.type2RepaymentThreshold) {
      let repaymentThreshold;
      if (this.planType & PlanFlags.Type1) {
        repaymentThreshold = this.type2RepaymentThreshold;
      } else {
        repaymentThreshold = this.type1RepaymentThreshold;
      }

      return ((this.grossSalary - repaymentThreshold) / this.salaryEligibleForRepayments);
    }

    return 0;
  }

  get type1TotalTimeRemainingExclusive(): number {
    return (Finance.nper(this.type1InterestRateDecimal / 12, -(this.type1MonthlyPaymentAmount), this.type1BalanceRemainingForCalc) / 12);
  }

  get type2TotalTimeRemainingExclusive(): number {
    return (Finance.nper(this.type2InterestRateDecimal / 12, -(this.type2MonthlyPaymentAmount), this.type2BalanceRemainingForCalc) / 12);
  }

  get type1RemainingBalanceOnType2Completion(): number {
    return Finance.fv(this.type1InterestRateDecimal / 12, this.type2TotalTimeRemainingExclusive * 12, this.type1MonthlyPaymentAmount, -(this.type1BalanceRemainingForCalc));
  }

  get type1TotalPaidOnType2Completion(): number {
    return this.type1MonthlyPaymentAmount * 12 * this.type2TotalTimeRemainingExclusive;
  }

  get type1InterestPaidOnType2Completion(): number {
    return this.type1TotalPaidOnType2Completion - (this.type1BalanceRemainingForCalc - this.type1RemainingBalanceOnType2Completion);
  }

  get type1YearsRemaining(): number {
    if (~this.planType & PlanFlags.Type1) {
      return 0;
    }

    if (this.planType & PlanFlags.Type2 && this.type1TotalTimeRemainingExclusive > this.type2TotalTimeRemainingExclusive) {
      return this.type2YearsRemaining + (Finance.nper(this.type1InterestRateDecimal / 12, -(this.totalMonthlyPaymentAmount), this.type1RemainingBalanceOnType2Completion) / 12);
    }

    return (Finance.nper(this.type1InterestRateDecimal / 12, -(this.totalMonthlyPaymentAmount), this.type1BalanceRemainingForCalc) / 12);
  }

  get type2YearsRemaining(): number {
    if (~this.planType & PlanFlags.Type2) {
      return 0;
    }

    return (Finance.nper(this.type2InterestRateDecimal / 12, -(this.type2MonthlyPaymentAmount), this.type2BalanceRemainingForCalc) / 12);
  }

  get totalYearsRemaining(): number {
    return Math.max(this.type1YearsRemaining, this.type2YearsRemaining);
  }

  get type1TotalPaymentRemaining(): number {
    if (~this.planType & PlanFlags.Type1) {
      return 0;
    }

    if (~this.planType & PlanFlags.Type2) {
      return this.totalMonthlyPaymentAmount * 12 * this.type1YearsRemaining;
    }

    return this.type1TotalPaidOnType2Completion + this.totalMonthlyPaymentAmount * 12 * (this.type1YearsRemaining - this.type2YearsRemaining);
  }

  get type2TotalPaymentRemaining(): number {
    if (~this.planType & PlanFlags.Type2) {
      return 0;
    }

    return this.type2MonthlyPaymentAmount * 12 * this.type2YearsRemaining;
  }

  get totalPaymentRemaining(): number {
    return this.type1TotalPaymentRemaining + this.type2TotalPaymentRemaining;
  }

  get type1TotalInterestToPay(): number {
    return this.type1TotalPaymentRemaining - this.type1BalanceRemainingForCalc;
  }

  get type2TotalInterestToPay(): number {
    return this.type2TotalPaymentRemaining - this.type2BalanceRemainingForCalc;
  }

  get totalInterestToPay(): number {
    return this.type1TotalInterestToPay + this.type2TotalInterestToPay;
  }

  formatMoney(money: number): string {
    return `£${money.toFixed(2)}`;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
