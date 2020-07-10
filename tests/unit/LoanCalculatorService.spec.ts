import LoanCalculatorService from '@/calculators/loanCalculatorService';
import LoanDescription from '@/calculators/loanDescription';
import { LoanType } from '@/calculators/loanType';

test('paying off loan 1 only returns expect', () => {
  const loanOneDescription: LoanDescription = new LoanDescription(10000, 1, 19390, LoanType.Type1);

  const result = LoanCalculatorService.calculate(50000, loanOneDescription);

  expect(result).toBe(2);
});
