import { DateTime } from "luxon";
import LoanType from "./loanType";

export default interface Loan {
    balanceRemaining?: number;

    loanType?: LoanType;

    firstRepaymentDate?: DateTime;

    academicYearLoanTakenOut?: number;

    studyingPartTime?: boolean;

    courseStartDate?: DateTime;

    courseEndDate?: DateTime;
}