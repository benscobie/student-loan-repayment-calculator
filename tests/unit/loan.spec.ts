import Loan from '@/calculators/loan';

test('payment for single period calculates correctly', () => {
  const loan: Loan = new Loan(100.00, 1.0);
  loan.period(10.00);
  expect(loan.balance).toBeCloseTo(90.90);
  expect(loan.totalPaid).toBeCloseTo(10.00);
  expect(loan.totalInterestPaid).toBeCloseTo(0.90);
});

test('payment for two periods calculates correctly', () => {
  const loan: Loan = new Loan(100.00, 1.0);
  loan.period(10.00);

  expect(loan.balance).toBeCloseTo(90.90);
  expect(loan.totalPaid).toBeCloseTo(10.00);
  expect(loan.totalInterestPaid).toBeCloseTo(0.90);

  loan.period(10.00);

  expect(loan.balance).toBeCloseTo(81.71);
  expect(loan.totalPaid).toBeCloseTo(20.00);
  expect(loan.totalInterestPaid).toBeCloseTo(1.71);
});

test('paying off balance calculates correctly', () => {
  const loan: Loan = new Loan(100.00, 1.0);
  loan.period(100.00);
  expect(loan.balance).toBeCloseTo(0);
});
