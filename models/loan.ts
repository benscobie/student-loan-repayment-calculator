import LoanType from "./loanType";

export default interface Loan {
  id: number;

  balanceRemaining?: number;

  loanType?: LoanType;

  academicYearLoanTakenOut?: number;

  studyingPartTime: boolean;

  courseStartDate?: Date;

  courseEndDate?: Date;
}
