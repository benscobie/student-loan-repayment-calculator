<template>
  <div class="row">
    <div class="col">
      <h3>Your Details</h3>
      <form>
        <div class="form-group">
          <label for="grossSalary">Salary pre-tax</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input type="text" class="form-control" id="grossSalary" aria-describedby="grossSalaryHelp" placeholder="25000.00" v-model="grossSalary">
          </div>
          <small id="grossSalaryHelp" class="form-text text-muted">Enter your salary before any tax.</small>
        </div>

        <h4>Plan Details</h4>
        <div class="form-group">
          <label for="plan1BalanceRemaining">Plan 1 balance remaining</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input type="text" class="form-control" id="plan1BalanceRemaining" aria-describedby="plan1BalanceRemainingHelp" placeholder="10000.00" v-model="plan1BalanceRemaining">
          </div>
          <small id="plan1BalanceRemainingHelp" class="form-text text-muted">The remaining balance of your plan 2 loan.</small>
        </div>
        <div class="form-group">
          <label for="plan2BalanceRemaining">Plan 2 balance remaining</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input type="text" class="form-control" id="plan2BalanceRemaining" aria-describedby="plan2BalanceRemainingHelp" placeholder="15000.00" v-model="plan2BalanceRemaining">
          </div>
          <small id="plan2BalanceRemainingHelp" class="form-text text-muted">The remaining balance of your plan 2 loan.</small>
        </div>

        <h4>Advanced Plan Details</h4>
        <div class="form-group">
          <label for="plan1InterestRate">Plan 1 interest rate</label>
          <div class="input-group">
            <input type="text" class="form-control" id="plan1InterestRate" aria-describedby="plan1InterestRateHelp" placeholder="1.5" v-model="plan1InterestRate">
            <div class="input-group-append">
              <span class="input-group-text">%</span>
            </div>
          </div>
          <small id="plan1InterestRateHelp" class="form-text text-muted">The current interest rate of your plan 1 loan.</small>
        </div>
        <div class="form-group">
          <label for="plan2InterestRate">Plan 2 interest rate</label>
          <div class="input-group">
            <input type="text" class="form-control" id="plan2InterestRate" aria-describedby="plan2InterestRateHelp" placeholder="6" v-model="plan2InterestRate">
            <div class="input-group-append">
              <span class="input-group-text">%</span>
            </div>
          </div>
          <small id="plan2InterestRateHelp" class="form-text text-muted">The current interest rate of your plan 1 loan.</small>
        </div>

        <div class="form-group">
          <label for="plan1RepaymentThreshold">Plan 1 repayment threshold</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input type="text" class="form-control" id="plan1RepaymentThreshold" placeholder="15000.00" v-model="plan1RepaymentThreshold">
          </div>
        </div>

        <div class="form-group">
          <label for="plan2RepaymentThreshold">Plan 2 repayment threshold</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">£</span>
            </div>
            <input type="text" class="form-control" id="plan2RepaymentThreshold" placeholder="15000.00" v-model="plan2RepaymentThreshold">
          </div>
        </div>
      </form>
    </div>
    <div class="col">
      <h3>Results</h3>
      <p>Salary eligible for repayment: <span>{{ formatMoney(salaryEligibleForRepayments) }}</span></p>

      <table class="table">
        <thead>
          <th scope="col">&nbsp;</th>
          <th scope="col">Yearly</th>
          <th scope="col">Monthly</th>
          <th scope="col">Split</th>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Plan 1 payment</th>
            <td>{{ formatMoney(plan1YearlyPaymentAmount) }}</td>
            <td>{{ formatMoney(plan1MonthlyPaymentAmount) }}</td>
            <td>{{ (payment1SplitPercentage * 100).toFixed(2) }}%</td>
          </tr>
          <tr>
            <th scope="row">Plan 2 payment</th>
            <td>{{ formatMoney(plan2YearlyPaymentAmount) }}</td>
            <td>{{ formatMoney(plan2MonthlyPaymentAmount) }}</td>
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
          <th scope="col">Plan 1</th>
          <th scope="col">Plan 2</th>
          <th scope="col">Total</th>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Interest to pay on balances</th>
            <td>{{ formatMoney(plan1TotalInterestToPay) }}</td>
            <td>{{ formatMoney(plan2TotalInterestToPay) }}</td>
            <td>{{ formatMoney(totalInterestToPay) }}</td>
          </tr>
          <tr>
            <th scope="row">Total payment remaining</th>
            <td>{{ formatMoney(plan1TotalPaymentRemaining) }}</td>
            <td>{{ formatMoney(plan2TotalPaymentRemaining) }}</td>
            <td>{{ formatMoney(totalPaymentRemaining) }}</td>
          </tr>
          <tr>
            <th scope="row">Years remaining</th>
            <td>{{ plan1YearsRemaining.toFixed(2) }}</td>
            <td>{{ plan2YearsRemaining.toFixed(2) }}</td>
            <td>{{ totalYearsRemaining.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Calculator extends Vue {

  grossSalary: number = 50000;
  plan1BalanceRemaining: number = 7000;
  plan1InterestRate: number = 1.5;
  plan1RepaymentThreshold: number = 18935;
  plan2BalanceRemaining: number = 5000;
  plan2InterestRate: number = 5.34;
  plan2RepaymentThreshold: number = 25725;

  get plan1InterestRateDecimal(): number {
    return this.plan1InterestRate / 100;
  }

  get plan2InterestRateDecimal(): number {
    return this.plan2InterestRate / 100;
  }

  get salaryEligibleForRepayments(): number {
    if (this.grossSalary <= this.plan1RepaymentThreshold) {
      return 0;
    }

    return (this.grossSalary - this.plan1RepaymentThreshold);
  }

  get totalYearlyPaymentAmount(): number {
    return this.salaryEligibleForRepayments * 0.09;
  }

  get totalMonthlyPaymentAmount(): number {
    return this.totalYearlyPaymentAmount / 12;
  }

  get plan1MonthlyPaymentAmount(): number {
    return this.totalMonthlyPaymentAmount * this.payment1SplitPercentage;
  }

  get plan1YearlyPaymentAmount(): number {
    return this.totalYearlyPaymentAmount * this.payment1SplitPercentage;
  }

  get plan2MonthlyPaymentAmount(): number {
    return this.totalMonthlyPaymentAmount * this.payment2SplitPercentage;
  }

  get plan2YearlyPaymentAmount(): number {
    return this.totalYearlyPaymentAmount * this.payment2SplitPercentage;
  }

  get payment1SplitPercentage(): number {
    if (this.grossSalary > this.plan2RepaymentThreshold) {
      return ((this.plan2RepaymentThreshold - this.plan1RepaymentThreshold) / this.salaryEligibleForRepayments);
    } else {
      return 1;
    }
  }

  get payment2SplitPercentage(): number {
    if (this.grossSalary > this.plan2RepaymentThreshold) {
      return ((this.grossSalary - this.plan2RepaymentThreshold) / this.salaryEligibleForRepayments);
    } else {
      return 0;
    }
  }

  get plan1TotalTimeRemainingExclusive(): number {
    return (this.nper(this.plan1InterestRateDecimal / 12, -(this.plan1MonthlyPaymentAmount), this.plan1BalanceRemaining) / 12)
  }

  get plan2TotalTimeRemainingExclusive(): number {
    return (this.nper(this.plan2InterestRateDecimal / 12, -(this.plan2MonthlyPaymentAmount), this.plan2BalanceRemaining) / 12)
  }

  get plan1RemainingBalanceOnPlan2Completion(): number {
    return this.fv(this.plan1InterestRateDecimal / 12,this.plan2TotalTimeRemainingExclusive * 12, this.plan1MonthlyPaymentAmount, -(this.plan1BalanceRemaining));
  }

  get plan1TotalPaidOnPlan2Completion(): number {
    return this.plan1MonthlyPaymentAmount * 12 * this.plan2TotalTimeRemainingExclusive;
  }

  get plan1InterestPaidOnPlan2Completion(): number {
    return this.plan1TotalPaidOnPlan2Completion - (this.plan1BalanceRemaining - this.plan1RemainingBalanceOnPlan2Completion);
  }

  get plan1YearsRemaining(): number {
    if(this.plan1TotalTimeRemainingExclusive > this.plan2TotalTimeRemainingExclusive) {
      return this.plan2YearsRemaining + (this.nper(this.plan1InterestRateDecimal / 12, -(this.totalMonthlyPaymentAmount), this.plan1RemainingBalanceOnPlan2Completion) / 12);
    } else {
      return (this.nper(this.plan1InterestRateDecimal / 12, -(this.totalMonthlyPaymentAmount), this.plan1BalanceRemaining) / 12);
    }
  }

  get plan2YearsRemaining(): number {
    return (this.nper(this.plan2InterestRateDecimal / 12, -(this.plan2MonthlyPaymentAmount), this.plan2BalanceRemaining) / 12);
  }

  get totalYearsRemaining(): number {
    return Math.max(this.plan1YearsRemaining, this.plan2YearsRemaining);
  }

  get plan1TotalPaymentRemaining(): number {
    return this.plan1TotalPaidOnPlan2Completion + this.totalMonthlyPaymentAmount * 12 * (this.plan1YearsRemaining - this.plan2YearsRemaining);
  }

  get plan2TotalPaymentRemaining(): number {
    return this.plan2MonthlyPaymentAmount * 12 * this.plan2YearsRemaining;
  }

  get totalPaymentRemaining(): number {
    return this.plan1TotalPaymentRemaining + this.plan2TotalPaymentRemaining;
  }

  get plan1TotalInterestToPay(): number {
    return this.plan1TotalPaymentRemaining - this.plan1BalanceRemaining;
  }

  get plan2TotalInterestToPay(): number {
    return this.plan2TotalPaymentRemaining - this.plan2BalanceRemaining;
  }

  get totalInterestToPay(): number {
    return this.plan1TotalInterestToPay + this.plan2TotalInterestToPay;
  }

  formatMoney(money: number): string {
    return '£' + money.toFixed(2);
  }

  nper(rate: number, pmt: number, pv: number, type: number = 0, fv: number = 0): number {
    var num = pmt * (1 + rate * type) - fv * rate;
    var den = (pv * rate + pmt * (1 + rate * type));
    return Math.log(num / den) / Math.log(1 + rate);
  }

  fv(rate: number, nper: number, pmt: number, pv: number = 0, type: number = 0) {
    var pow = Math.pow(1 + rate, nper),
      fv;
    if (rate) {
      fv = (pmt*(1+rate*type)*(1-pow)/rate)-pv*pow;
    } else {
      fv = -1 * (pv + pmt * nper);
    }
    return fv;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
