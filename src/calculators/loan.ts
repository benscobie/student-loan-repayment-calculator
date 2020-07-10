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
    const balanceBeforePeriod: number = this.balance;
    const requiredPaymentAmount: number = Finance.pmt((this.interestRate / 100) / 12, 1, -this.balance, 0, 0);

    let newBalanceAfterPayment: number;
    if (amountPaid >= requiredPaymentAmount) {
      // How do HMRC deal with refunds, or do they take the correct amount at the end?
      newBalanceAfterPayment = 0;
    } else {
      newBalanceAfterPayment = Finance.fv((this.interestRate / 100) / 12, 1, amountPaid, -this.balance, 1);
    }

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
