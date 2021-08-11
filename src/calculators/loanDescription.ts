import LoanType from '@/calculators/loanType';

export default class LoanDescription {
  constructor(balance: number,
    interestRate: number,
    repaymentThreshold: number,
    type: LoanType) {
    this.balance = balance;
    this.interestRate = interestRate;
    this.repaymentThreshold = repaymentThreshold;
    this.type = type;
  }

  balance: number;

  interestRate: number;

  repaymentThreshold: number;

  type: LoanType;
}
