import { LoanType } from "@/calculators/loanType";

export default class LoanDescription {

  constructor(balance: number,
    interest_rate: number,
    repayment_threshold: number,
    type: LoanType) {
    this.balance = balance;
    this.interest_rate = interest_rate;
    this.repayment_threshold = repayment_threshold;
    this.type = type;
  }

  balance: number;
  interest_rate: number;
  repayment_threshold: number;
  type: LoanType;
}
