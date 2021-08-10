import Finance from "../calculators/finance";
import LoanBreakdown from "@/calculators/loanBreakdown";

export default class Loan {

  balance: number;
  interestRate: number;
  totalInterestPaid: number = 0;
  totalPaid: number = 0;
  period: number = 0;

  constructor(balance: number, interestRate: number) {
    this.balance = balance;
    this.interestRate = interestRate;
  }

  pay(amountPaid: number): LoanBreakdown {
    this.period++;
    const balanceBeforePeriod: number = this.balance;

    // Interest rate is for the whole year
    let newBalanceAfterPayment = Finance.fv((this.interestRate / 100) / 12, 1, amountPaid, -this.balance, 1);

    if (Math.floor(newBalanceAfterPayment) == 0) {
      this.balance = 0;
    } else {
      this.balance = newBalanceAfterPayment;
    }

    let interestApplied: number = amountPaid - (balanceBeforePeriod - newBalanceAfterPayment);

    this.totalInterestPaid += interestApplied;
    this.totalPaid += amountPaid;

    return new LoanBreakdown(
      this.period,
      balanceBeforePeriod,
      this.interestRate,
      amountPaid,
      interestApplied,
      this.totalPaid,
      this.totalInterestPaid)
  }
}
