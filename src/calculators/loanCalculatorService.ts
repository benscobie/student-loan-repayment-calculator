import Loan from '@/calculators/loan';
import LoanDescription from '@/calculators/loanDescription';
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import LoanType from '@/calculators/loanType';
import loanBreakdown from './loanBreakdown';

export default class LoanCalculatorService {
  static calculate(grossSalary: number, loanOneDescription?: LoanDescription, loanTwoDescription?: LoanDescription): LoanCalculationResult {
    let loanOne: Loan | null = null;
    let loanTwo: Loan | null = null;

    // TODO Move loan creation out
    if (loanOneDescription != null) {
      loanOne = new Loan(loanOneDescription.balance, loanOneDescription.interestRate, LoanType.Type1);
    }

    if (loanTwoDescription != null) {
      loanTwo = new Loan(loanTwoDescription.balance, loanTwoDescription.interestRate, LoanType.Type2);
    }

    if (!loanOne && !loanTwo) {
      throw new Error('No loans');
    }

    // TODO Move loan validation
    if (loanOne && loanTwo && loanOneDescription!.repaymentThreshold > loanTwoDescription!.repaymentThreshold) {
      throw new Error('Loan two threshold must be greater than loan one threshold');
    }

    const loanThresholds = {
      [LoanType.Type1]: loanOneDescription?.repaymentThreshold,
      [LoanType.Type2]: loanTwoDescription?.repaymentThreshold,
    }

    const loanBreakdowns: loanBreakdown[] = [];
    const loansToPay = [];

    if (loanTwo) {
      loansToPay.push(loanTwo);
    }

    if (loanOne) {
      loansToPay.push(loanOne);
    }

    let numPeriods = 0;
    let hasBalanceLeft = true;
    while (hasBalanceLeft) {
      numPeriods += 1;

      let balanceLeft = false;
      let amountLeftover = 0;
      for (let i = 0; i < loansToPay.length; i += 1) {
        const loan = loansToPay[i];

        let paymentToAllocate = 0;

        if (i > 0) {
          const previousLoan = loansToPay[i - 1]
          paymentToAllocate = (((loanThresholds[previousLoan.loanType]! - loanThresholds[loan.loanType]!) * 0.09) / 12) + amountLeftover;
        } else {
          const salaryEligibleForRepayment = grossSalary - loanThresholds[loan.loanType]!;
          paymentToAllocate = (salaryEligibleForRepayment * 0.09) / 12;
        }

        if (loan.balance > 0) {
          const amountToPay = Math.min(paymentToAllocate, loan.amountRemainingForNextPeriod());
          const loanBreakdown = loan.pay(amountToPay);
          amountLeftover = paymentToAllocate - amountToPay;

          loanBreakdowns.push(loanBreakdown)

          if (loan.balance > 0) {
            balanceLeft = true
          }
        } else {
          amountLeftover = paymentToAllocate;
        }
      }

      hasBalanceLeft = balanceLeft;
    }

    return new LoanCalculationResult(numPeriods, loanBreakdowns);
  }
}
