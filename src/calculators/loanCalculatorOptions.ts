import LoanDescription from '@/calculators/loanDescription';

export default interface LoanCalculatorOptions {
  loanDescriptions: Array<LoanDescription>;
  grossSalary: number;
  yearlySalaryIncrease: number;
}
