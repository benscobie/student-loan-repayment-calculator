export default class LoanBreakdown {
  constructor(
    period: number,
    debt: number,
    interest_rate: number,
    paid_in_period: number,
    interest_applied_in_period: number,
    total_paid: number,
    total_interest_paid: number) {
    this.period = period;
    this.debt = debt;
    this.interest_rate = interest_rate;
    this.paid_in_period = paid_in_period;
    this.interest_applied_in_period = interest_applied_in_period;
    this.total_paid = total_paid;
    this.total_interest_paid = total_interest_paid;
  }

  period: number;
  debt: number;
  interest_rate: number;
  paid_in_period: number;
  interest_applied_in_period: number;
  total_paid: number;
  total_interest_paid: number;
}
