import Loan from '@/calculators/loan';
import LoanDescription from '@/calculators/loanDescription';
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import LoanType from '@/calculators/loanType';
import loanBreakdown from './loanBreakdown';
import LoanCalculatorOptions from '@/calculators/loanCalculatorOptions';

export default class LoanCalculatorService {
  static calculate(options: LoanCalculatorOptions): LoanCalculationResult {
    if (options.loanDescriptions.length === 0) {
      throw new Error('No loans');
    }

    const loanThresholds: { [id: string]: any; } = {};
    const loansToPay = [];

    // eslint-disable-next-line no-nested-ternary
    const sortedLoanDescriptions = options.loanDescriptions.sort((a, b) => (a.repaymentThreshold < b.repaymentThreshold ? 1 : a.repaymentThreshold > b.repaymentThreshold ? -1 : 0))

    // eslint-disable-next-line no-restricted-syntax
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
          const salaryEligibleForRepayment = options.grossSalary - loanThresholds[loan.loanType]!;
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
