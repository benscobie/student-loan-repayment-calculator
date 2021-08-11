export default class LoanBreakdown {
  constructor(
    period: number,
    debt: number,
    interestRate: number,
    paidInPeriod: number,
    interestAppliedInPeriod: number,
    totalPaid: number,
    totalInterestPaid: number,
  ) {
    this.period = period;
    this.debt = debt;
    this.interestRate = interestRate;
    this.paidInPeriod = paidInPeriod;
    this.interestAppliedInPeriod = interestAppliedInPeriod;
    this.totalPaid = totalPaid;
    this.totalInterestPaid = totalInterestPaid;
  }

  period: number;

  debt: number;

  interestRate: number;

  paidInPeriod: number;

  interestAppliedInPeriod: number;

  totalPaid: number;

  totalInterestPaid: number;
}
