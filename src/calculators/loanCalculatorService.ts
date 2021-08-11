import Loan from '@/calculators/loan';
import LoanDescription from '@/calculators/loanDescription';
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import Finance from './finance';

export default class LoanCalculatorService {
  static calculate(grossSalary: number, loanOneDescription?: LoanDescription, loanTwoDescription?: LoanDescription): LoanCalculationResult {
    let loanOne: Loan | null = null;
    let loanTwo: Loan | null = null;

    // TODO Move loan creation out
    if (loanOneDescription != null) {
      loanOne = new Loan(loanOneDescription.balance, loanOneDescription.interestRate);
    }

    if (loanTwoDescription != null) {
      loanTwo = new Loan(loanTwoDescription.balance, loanTwoDescription.interestRate);
    }

    if (!loanOne && !loanTwo) {
      throw new Error('No loans');
    }

    // TODO Move loan validation
    if (loanOne && loanTwo && loanOneDescription!.repaymentThreshold > loanTwoDescription!.repaymentThreshold) {
      throw new Error('Loan two threshold must be greater than loan one threshold');
    }

    let hasBalanceLeft = true;
    let salaryEligibleForRepayments: number;

    if (loanOne) {
      salaryEligibleForRepayments = grossSalary - loanOneDescription!.repaymentThreshold;
    } else {
      salaryEligibleForRepayments = grossSalary - loanTwoDescription!.repaymentThreshold;
    }

    if (salaryEligibleForRepayments <= 0) {
      throw new Error('Invalid salary eligible for repayment calculated.');
    }

    const monthlyPaymentToAllocate: number = (salaryEligibleForRepayments * 0.09) / 12;
    let numPeriods = 0;

    const loanOneBreakdowns = [];
    const loanTwoBreakdowns = [];

    while (hasBalanceLeft) {
      numPeriods += 1;

      if (loanOne && !loanTwo) {
        const paymentAmount = Math.min(monthlyPaymentToAllocate, loanOne.nextPeriodPaymentAmount());
        const loanBreakdown = loanOne.pay(paymentAmount);
        loanOneBreakdowns.push(loanBreakdown);
        hasBalanceLeft = loanOne.balance > 0;
      } else if (!loanOne && loanTwo) {
        const paymentAmount = Math.min(monthlyPaymentToAllocate, loanTwo.nextPeriodPaymentAmount());
        const loanBreakdown = loanTwo.pay(paymentAmount);
        loanTwoBreakdowns.push(loanBreakdown);
        hasBalanceLeft = loanTwo.balance > 0;
      } else {
        /*
        const loanOneSplitPercentage: number = (loanTwoDescription!.repaymentThreshold - loanOneDescription!.repaymentThreshold) / salaryEligibleForRepayments;
        const loanTwoSplitPercentage: number = 1 - loanOneSplitPercentage;
        const loanOnePaymentAmount = 0;

        if (loanOne!.balance <= 0) {

        }

        hasBalanceLeft = loanOne!.balance > 0 || loanTwo!.balance > 0;
        */
      }
    }

    return new LoanCalculationResult(numPeriods, loanOneBreakdowns, loanTwoBreakdowns);
  }
}
