import LoanBreakdown from '@/calculators/loanBreakdown';

export default class LoanCalculationResult {
  constructor(periods: number,
    loanOneBreakdowns: Array<LoanBreakdown>,
    loanTwoBreakdowns: Array<LoanBreakdown>) {
    this.loanOneBreakdowns = loanOneBreakdowns;
    this.loanTwoBreakdowns = loanTwoBreakdowns;
    this.periods = periods;
  }

  loanOneBreakdowns: Array<LoanBreakdown>;

  loanTwoBreakdowns: Array<LoanBreakdown>;

  periods: number;
}
