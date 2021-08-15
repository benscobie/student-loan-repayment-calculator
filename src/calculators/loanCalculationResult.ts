import LoanBreakdown from '@/calculators/loanBreakdown';

export default class LoanCalculationResult {
  constructor(periods: number,
    loanBreakdowns: Array<LoanBreakdown>) {
    this.loanBreakdowns = loanBreakdowns;
    this.periods = periods;
  }

  loanBreakdowns: Array<LoanBreakdown>;

  periods: number;
}
