import LoanType from "./loanType";

export default interface Loan {
    balanceRemaining?: number;

    loanType?: LoanType;

    firstRepaymentDate?: Date;

    academicYearLoanTakenOut?: number;

    studyingPartTime?: boolean;

    courseStartDate?: Date;

    courseEndDate?: Date;
}