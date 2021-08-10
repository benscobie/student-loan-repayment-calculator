import LoanBreakdown from "@/calculators/loanBreakdown";

export default class LoanCalculationResult {

  constructor(periods: number,
              loanOneBreakdowns: Array<LoanBreakdown>,
              loanTwoBreakdowns: Array<LoanBreakdown>) {
    this.loan_one_breakdowns = loanOneBreakdowns;
    this.loan_two_breakdowns = loanTwoBreakdowns;
    this.periods = periods;
  }

  loan_one_breakdowns: Array<LoanBreakdown>;

  loan_two_breakdowns: Array<LoanBreakdown>;

  periods: number;
}
