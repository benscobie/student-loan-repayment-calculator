import LoanBreakdown from '@/calculators/loanBreakdown';
import Finance from './finance';

export default class Loan {
  balance: number;

  interestRate: number;

  totalInterestPaid = 0;

  totalPaid = 0;

  period = 0;

  constructor(balance: number, interestRate: number) {
    this.balance = balance;
    this.interestRate = interestRate;
  }

  nextPeriodPaymentAmount(): number {
    return Finance.pmt((this.interestRate / 100) / 12, 1, -this.balance, 0, 0);
  }

  pay(amountPaid: number): LoanBreakdown {
    this.period += 1;
    const balanceBeforePeriod: number = this.balance;

    // Interest rate is for the whole year
    const newBalanceAfterPayment = Finance.fv((this.interestRate / 100) / 12, 1, amountPaid, -this.balance, 0);

    if (Math.floor(newBalanceAfterPayment) === 0) {
      this.balance = 0;
    } else {
      this.balance = newBalanceAfterPayment;
    }

    const interestApplied: number = amountPaid - (balanceBeforePeriod - newBalanceAfterPayment);

    this.totalInterestPaid += interestApplied;
    this.totalPaid += amountPaid;

    return new LoanBreakdown(
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
