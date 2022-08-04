import LoanBreakdown from '../calculators/loanBreakdown';

export interface LoanCalculationResultInterface {
  loanBreakdowns: Array<LoanBreakdown>;

  periods: number;
}

export class LoanCalculationResult implements LoanCalculationResultInterface {
  constructor(periods: number,
    loanBreakdowns: Array<LoanBreakdown>) {
    this.loanBreakdowns = loanBreakdowns;
    this.periods = periods;
  }

  loanBreakdowns: Array<LoanBreakdown>;

  periods: number;
}

