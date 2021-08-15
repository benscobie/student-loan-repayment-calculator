import Loan from '@/calculators/loan';
import LoanType from '@/calculators/loanType';

// TODO Fix these tests, they assume interest is applied for 1 period, not 12

test.skip('payment for single period calculates correctly', () => {
  const loan: Loan = new Loan(100.00, 1.0, LoanType.Type1);
  const result = loan.pay(10.00);

  expect(loan.balance).toBeCloseTo(90.90);
  expect(loan.totalPaid).toBeCloseTo(10.00);
  expect(loan.totalInterestPaid).toBeCloseTo(0.90);
});

test.skip('payment for two periods calculates correctly', () => {
  const loan: Loan = new Loan(100.00, 1.0, LoanType.Type1);
  const resultPeriodOne = loan.pay(10.00);

  expect(loan.balance).toBeCloseTo(90.90);
  expect(loan.totalPaid).toBeCloseTo(10.00);
  expect(loan.totalInterestPaid).toBeCloseTo(0.90);

  const resultPeriodTwo = loan.pay(10.00);

  expect(loan.balance).toBeCloseTo(81.71);
  expect(loan.totalPaid).toBeCloseTo(20.00);
  expect(loan.totalInterestPaid).toBeCloseTo(1.71);
});

test.skip('paying off balance calculates correctly', () => {
  const loan: Loan = new Loan(100.00, 1.0, LoanType.Type1);
  loan.pay(100.00);
  expect(loan.balance).toBeCloseTo(0);
});
