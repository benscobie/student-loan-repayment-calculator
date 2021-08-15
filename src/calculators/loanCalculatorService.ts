import Loan from '@/calculators/loan';
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import loanBreakdown from './loanBreakdown';
import LoanCalculatorOptions from '@/calculators/loanCalculatorOptions';

export default class LoanCalculatorService {
  static calculate(options: LoanCalculatorOptions): LoanCalculationResult {
    if (options.loanDescriptions.length === 0) {
      throw new Error('No loans');
    }

    const loanThresholds: { [id: string]: number; } = {};
    const loansToPay = [];

    const sortedLoanDescriptions = options.loanDescriptions.sort((a, b) => (a.repaymentThreshold < b.repaymentThreshold ? 1 : a.repaymentThreshold > b.repaymentThreshold ? -1 : 0))

    for (const loanDesc of sortedLoanDescriptions) {
      const loan = new Loan(loanDesc.balance, loanDesc.interestRate, loanDesc.type);
      loansToPay.push(loan);

      loanThresholds[loan.loanType] = loanDesc.repaymentThreshold;
    }

    // TODO Move loan validation
    /*
    if (loanOne && loanTwo && loanOneDescription!.repaymentThreshold > loanTwoDescription!.repaymentThreshold) {
      throw new Error('Loan two threshold must be greater than loan one threshold');
    }
    */

    const loanBreakdowns: loanBreakdown[] = [];

    let numPeriods = 0;
    let hasBalancesLeftToPay = true;
    while (hasBalancesLeftToPay) {
      numPeriods += 1;
      hasBalancesLeftToPay = false;

      let amountLeftover = 0;
      for (let loanNumber = 0; loanNumber < loansToPay.length; loanNumber += 1) {
        const loan = loansToPay[loanNumber];
        let paymentToAllocate = 0;

        if (loanNumber == 0) {
          const salaryEligibleForRepayment = options.grossSalary - loanThresholds[loan.loanType];
          paymentToAllocate = (salaryEligibleForRepayment * 0.09) / 12;
        } else {
          const previousLoan = loansToPay[loanNumber - 1]
          paymentToAllocate = (((loanThresholds[previousLoan.loanType] - loanThresholds[loan.loanType]) * 0.09) / 12) + amountLeftover;
        }

        if (loan.balance > 0) {
          const amountToPay = Math.min(paymentToAllocate, loan.amountRemainingForNextPeriod());
          const loanBreakdown = loan.pay(amountToPay);
          loanBreakdowns.push(loanBreakdown)
          amountLeftover = paymentToAllocate - amountToPay;

          if (loan.balance > 0) {
            hasBalancesLeftToPay = true
          }
        } else {
          amountLeftover = paymentToAllocate;
        }
      }
    }

    return new LoanCalculationResult(numPeriods, loanBreakdowns);
  }
}
