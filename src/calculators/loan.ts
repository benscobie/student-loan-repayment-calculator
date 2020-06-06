import Finance from "../calculators/finance";

export default class Loan {

  balance: number;
  interestRate: number;
  totalInterestPaid: number = 0;
  totalPaid: number = 0;

  constructor(balance: number, interestRate: number) {
    this.balance = balance;
    this.interestRate = interestRate;
  }

  period(amountPaid: number): void {
    let balanceBeforePeriod: number = this.balance;
    console.log("Current balance: " + balanceBeforePeriod);

    let newBalanceAfterPayment: number = Finance.fv(this.interestRate / 100, 1, amountPaid, -this.balance, 1);

    console.log("New balance: " + newBalanceAfterPayment);

    this.balance = newBalanceAfterPayment;
    let interestApplied: number = amountPaid - (balanceBeforePeriod - newBalanceAfterPayment);

    console.log("Interest applied: " + interestApplied);

    this.totalInterestPaid += interestApplied;
    this.totalPaid += amountPaid;

    console.log("Total interest applied: " + this.totalInterestPaid);
    console.log("Total paid: " + this.totalPaid);
  }

}
