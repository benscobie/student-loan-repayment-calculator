import LoanCalculatorService from '@/calculators/loanCalculatorService';
import LoanDescription from '@/calculators/loanDescription';
import LoanType from '@/calculators/loanType';

test('paying off loan 1 only returns expected', () => {
  const plans: LoanDescription[] = [];

  plans.push(new LoanDescription(10000, 1, 19390, LoanType.Type1));

  const result = LoanCalculatorService.calculate({ grossSalary: 50000, loanDescriptions: plans, yearlySalaryIncrease: 0 });

  expect(result.periods).toBe(45);
  expect(result.loanBreakdowns.length).toBe(45);
});

test('paying off loan 1 and loan 2 returns expected', () => {
  const plans: LoanDescription[] = [];

  plans.push(new LoanDescription(10000, 1, 19390, LoanType.Type1));
  plans.push(new LoanDescription(10000, 2, 26575, LoanType.Type2));

  const result = LoanCalculatorService.calculate({ grossSalary: 50000, loanDescriptions: plans, yearlySalaryIncrease: 0 });

  const lastTypeOne = result.loanBreakdowns.filter(({ loanType }) => loanType === LoanType.Type1).pop();
  const lastTypeTwo = result.loanBreakdowns.filter(({ loanType }) => loanType === LoanType.Type2).pop();

  expect(lastTypeOne?.totalPaid).toBeCloseTo(10529.79, 2);
  expect(lastTypeOne?.totalInterestPaid).toBeCloseTo(529.79, 2);

  expect(lastTypeTwo?.totalPaid).toBeCloseTo(10515.41, 2);
  expect(lastTypeTwo?.totalInterestPaid).toBeCloseTo(515.41, 2);
});
