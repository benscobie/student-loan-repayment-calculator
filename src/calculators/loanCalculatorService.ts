import Loan from '@/calculators/loan';
import LoanDescription from '@/calculators/loanDescription';
import { LoanType } from '@/calculators/loanType';
import Finance from './finance';

export default class LoanCalculatorService {
  static periodsRemainingForLoan(balanceRemaining: number, interestRate: number, paymentPerPeriod: number): number {
    return Finance.nper(interestRate, -paymentPerPeriod, balanceRemaining);
  }

  static calculate(grossSalary: number, loanOneDescription?: LoanDescription, loanTwoDescription?: LoanDescription) {
    let loanOne: Loan | null = null;
    let loanTwo: Loan | null = null;

    if (loanOneDescription != null) {
      loanOne = new Loan(loanOneDescription.balance, loanOneDescription.interest_rate);
    }

    if (loanTwoDescription != null) {
      loanTwo = new Loan(loanTwoDescription.balance, loanTwoDescription.interest_rate);
    }

    if (!loanOne && !loanTwo) {
      return false;
    }

    if (loanOne && loanTwo && loanOneDescription!.repayment_threshold > loanTwoDescription!.repayment_threshold) {
      return false;
    }

    let hasBalanceLeft = true;
    let salaryEligibleForRepayments: number;

    if (loanOne) {
      salaryEligibleForRepayments = grossSalary - loanOneDescription!.repayment_threshold;
    } else {
      salaryEligibleForRepayments = grossSalary - loanTwoDescription!.repayment_threshold;
    }

    if (salaryEligibleForRepayments <= 0) {
      return false;
    }

    const monthlyPaymentToAllocate: number = (salaryEligibleForRepayments * 0.09) / 12;
    let numPeriods = 0;

    while (hasBalanceLeft) {
      numPeriods++;

      if (loanOne && !loanTwo) {
        loanOne.period(monthlyPaymentToAllocate);
        hasBalanceLeft = loanOne.balance > 0;
      } else if (!loanOne && loanTwo) {
        loanTwo.period(monthlyPaymentToAllocate);
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

    return numPeriods;
  }

}
