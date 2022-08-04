import LoanBreakdown from '../calculators/loanBreakdown';
import Finance from './finance';
import LoanType from '../calculators/loanType';

export default class Loan {
  balance: number;

  interestRate: number;

  loanType: LoanType;

  totalInterestPaid = 0;

  totalPaid = 0;

  period = 0;

  constructor(balance: number, interestRate: number, loanType: LoanType) {
    this.balance = balance;
    this.interestRate = interestRate;
    this.loanType = loanType;
  }

  amountRemainingForNextPeriod(): number {
    return Finance.pmt((this.interestRate / 100) / 12, 1, -this.balance, 0, 0);
  }

  pay(amountPaid: number): LoanBreakdown {
    this.period += 1;
    const balanceBeforePeriod: number = this.balance;

    // Interest rate is for the whole year
    const newBalanceAfterPayment = Finance.fv((this.interestRate / 100) / 12, 1, amountPaid, -this.balance, 0);

    if (newBalanceAfterPayment === 0) {
      this.balance = 0;
    } else {
      this.balance = newBalanceAfterPayment;
    }

    const interestApplied = amountPaid - (balanceBeforePeriod - newBalanceAfterPayment);

    this.totalInterestPaid += interestApplied;
    this.totalPaid += amountPaid;

    return new LoanBreakdown(
      this.loanType,
      this.period,
      balanceBeforePeriod,
      this.interestRate,
      amountPaid,
      interestApplied,
      this.totalPaid,
      this.totalInterestPaid,
    );
  }
}
