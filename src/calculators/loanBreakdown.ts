import LoanType from '@/calculators/loanType';

export default class LoanBreakdown {
  constructor(
    loanType: LoanType,
    period: number,
    debt: number,
    interestRate: number,
    paidInPeriod: number,
    interestAppliedInPeriod: number,
    totalPaid: number,
    totalInterestPaid: number,
  ) {
    this.loanType = loanType;
    this.period = period;
    this.debt = debt;
    this.interestRate = interestRate;
    this.paidInPeriod = paidInPeriod;
    this.interestAppliedInPeriod = interestAppliedInPeriod;
    this.totalPaid = totalPaid;
    this.totalInterestPaid = totalInterestPaid;
  }

  loanType: LoanType;

  period: number;

  debt: number;

  interestRate: number;

  paidInPeriod: number;

  interestAppliedInPeriod: number;

  totalPaid: number;

  totalInterestPaid: number;
}
