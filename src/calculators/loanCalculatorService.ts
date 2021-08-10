import Loan from '@/calculators/loan';
import LoanDescription from '@/calculators/loanDescription';
import Finance from './finance';
import LoanCalculationResult from "@/calculators/loanCalculationResult";

export default class LoanCalculatorService {
  static periodsRemainingForLoan(balanceRemaining: number, interestRate: number, paymentPerPeriod: number): number {
    return Finance.nper(interestRate, -paymentPerPeriod, balanceRemaining);
  }

  static calculate(grossSalary: number, loanOneDescription?: LoanDescription, loanTwoDescription?: LoanDescription): LoanCalculationResult {
    let loanOne: Loan | null = null;
    let loanTwo: Loan | null = null;

    // TODO Move loan creation out
    if (loanOneDescription != null) {
      loanOne = new Loan(loanOneDescription.balance, loanOneDescription.interest_rate);
    }

    if (loanTwoDescription != null) {
      loanTwo = new Loan(loanTwoDescription.balance, loanTwoDescription.interest_rate);
    }

    if (!loanOne && !loanTwo) {
      throw new Error("No loans")
    }

    // TODO Move loan validation
    if (loanOne && loanTwo && loanOneDescription!.repayment_threshold > loanTwoDescription!.repayment_threshold) {
      throw new Error("Loan two threshold must be greater than loan one threshold")
    }

    let hasBalanceLeft = true;
    let salaryEligibleForRepayments: number;

    if (loanOne) {
      salaryEligibleForRepayments = grossSalary - loanOneDescription!.repayment_threshold;
    } else {
      salaryEligibleForRepayments = grossSalary - loanTwoDescription!.repayment_threshold;
    }

    if (salaryEligibleForRepayments <= 0) {
      throw new Error("Invalid salary eligible for repayment calculated.")
    }

    const monthlyPaymentToAllocate: number = (salaryEligibleForRepayments * 0.09) / 12;
    let numPeriods = 0;

    let loanOneBreakdowns = [];
    let loanTwoBreakdowns = [];

    while (hasBalanceLeft) {
      numPeriods++;

      if (loanOne && !loanTwo) {
        let paymentAmount = Math.min(monthlyPaymentToAllocate, loanOne.balance);
        let loanBreakdown = loanOne.pay(paymentAmount);
        loanOneBreakdowns.push(loanBreakdown);
        hasBalanceLeft = loanOne.balance > 0;
      } else if (!loanOne && loanTwo) {
        let paymentAmount = Math.min(monthlyPaymentToAllocate, loanTwo.balance);
        let loanBreakdown = loanTwo.pay(monthlyPaymentToAllocate);
        loanTwoBreakdowns.push(loanBreakdown);
        hasBalanceLeft = loanTwo.balance > 0;
      } else {
        const loanOneSplitPercentage: number = (loanTwoDescription!.repayment_threshold - loanOneDescription!.repayment_threshold) / salaryEligibleForRepayments;
        const loanTwoSplitPercentage: number = 1 - loanOneSplitPercentage;
        let loanOnePaymentAmount: number = 0;

        if (loanOne!.balance <= 0) {

        }

        hasBalanceLeft = loanOne!.balance > 0 || loanTwo!.balance > 0;
      }
    }

    return new LoanCalculationResult(numPeriods, loanOneBreakdowns, loanTwoBreakdowns);
  }
}
