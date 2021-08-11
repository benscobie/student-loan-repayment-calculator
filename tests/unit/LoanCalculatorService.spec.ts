import LoanCalculatorService from '@/calculators/loanCalculatorService';
import LoanDescription from '@/calculators/loanDescription';
import LoanType from '@/calculators/loanType';
import LoanCalculationResult from '@/calculators/loanCalculationResult';
import LoanBreakdown from '@/calculators/loanBreakdown';

test('paying off loan 1 only returns expected', () => {
  const loanOneDescription: LoanDescription = new LoanDescription(10000, 1, 19390, LoanType.Type1);

  const result = LoanCalculatorService.calculate(50000, loanOneDescription);

  expect(result.periods).toBe(45);
  expect(result.loanBreakdowns.length).toBe(45);
});
