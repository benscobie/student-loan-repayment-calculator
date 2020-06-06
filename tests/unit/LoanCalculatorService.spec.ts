import LoanCalculatorService from "@/calculators/loanCalculatorService";
import LoanDescription from '@/calculators/loanDescription';
import { LoanType } from '@/calculators/loanType';


test("paying off loan 1 only returns expect", () => {
  let loanCalculatorService: LoanCalculatorService = new LoanCalculatorService();
  let loanOneDescription: LoanDescription = new LoanDescription(10000, 1, 20000, LoanType.Type1);

  let result = loanCalculatorService.calculate(40000, loanOneDescription);

  expect(result).toBe(2);
});
