import { NextPage } from "next";
import React from "react";
import LoanType from "../models/loanType";
import Button from "./button";
import Input from "./input";
import LoanInputProps from "./LoanInputProps";
import Select from "./select";

const LoanInput: NextPage<LoanInputProps> = ({
  loan,
  onChange,
  availableLoanTypes,
}) => {
  const [loanType, setLoanType] = React.useState(loan.loanType);
  const [academicYearLoanTakenOut, setAcademicYearLoanTakenOut] =
    React.useState(loan.academicYearLoanTakenOut);
  const [courseStartDate, setCourseStartDate] = React.useState(
    loan.courseStartDate
  );
  const [courseEndDate, setCourseEndDate] = React.useState(loan.courseEndDate);
  const [firstRepaymentDate, setFirstRepaymentDate] = React.useState(
    loan.firstRepaymentDate
  );
  const [studyingPartTime, setSudyingPartTime] = React.useState(
    loan.studyingPartTime
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(
      {
        loanType,
        academicYearLoanTakenOut,
        courseStartDate,
        courseEndDate,
        firstRepaymentDate,
        studyingPartTime,
      }
    );
  };

  const loanTypeIsAvailable = (type: LoanType) => {
    return availableLoanTypes.includes(type) || loan.loanType == type;
  };

  const firstRepaymentDateRequired =
    (loanType == LoanType.Type1 && academicYearLoanTakenOut == 2006) ||
    loanType == LoanType.Type2 ||
    loanType == LoanType.Type4 ||
    loanType == LoanType.Postgraduate;

  const academicYearLoanTakenOutRequired =
    loanType == LoanType.Type1 || loanType == LoanType.Type4;

  const courseStartDateRequired = loanType == LoanType.Type2;

  const courseEndDateRequired = loanType == LoanType.Type2;

  const formValid = () => {
    if (loanType == LoanType.Unselected || loanType == null) {
      return false;
    }

    if (
      academicYearLoanTakenOutRequired &&
      (academicYearLoanTakenOut == null || academicYearLoanTakenOut <= 0)
    ) {
      return false;
    }

    if (firstRepaymentDateRequired && firstRepaymentDate == null) {
      return false;
    }

    if (courseStartDateRequired && courseStartDate == null) {
      return false;
    }

    if (courseEndDateRequired && courseEndDate == null) {
      return false;
    }

    return true;
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        id="loanType"
        label="Loan type"
        onChange={(e) => setLoanType(e.target.value)}
      >
        <option value={LoanType.Unselected}>--Please choose a plan--</option>

        {loanTypeIsAvailable(LoanType.Type1) && (
          <option value={LoanType.Type1}>Plan 1</option>
        )}

        {loanTypeIsAvailable(LoanType.Type2) && (
          <option value={LoanType.Type2}>Plan 2</option>
        )}

        {loanTypeIsAvailable(LoanType.Type4) && (
          <option value={LoanType.Type4}>Plan 4</option>
        )}

        {loanTypeIsAvailable(LoanType.Postgraduate) && (
          <option value={LoanType.Postgraduate}>Postgraduate loan</option>
        )}
      </Select>

      {loanType == LoanType.Type2 && (
        <>
          <Input
            id="courseStartDate"
            type="date"
            label="Course Start Date"
            onChange={(e) => setCourseStartDate(e.target.value)}
          />

          <Input
            id="courseEndDate"
            type="date"
            label="Course End Date"
            onChange={(e) => setCourseEndDate(e.target.value)}
          />

          <input
            type="checkbox"
            id="studyingPartTime"
            name="studyingPartTime"
            onChange={(e) => setSudyingPartTime(e.target.checked)}
          />
          <label htmlFor="studyingPartTime">Studying part-time</label>
        </>
      )}

      {academicYearLoanTakenOutRequired && (
        <>
          <Select
            id="academicYearLoanTakenOut"
            label="Academic Year Loan Taken Out"
            onChange={(e) => setAcademicYearLoanTakenOut(e.target.value)}
          >
            <option value="">--Please choose an option--</option>
            {loanType == LoanType.Type1 && (
              <>
                <option value="2005">2005 to 2006, or earlier</option>
                <option value="2006">2006 to 2007, or later</option>
              </>
            )}
            {loanType == LoanType.Type4 && (
              <>
                <option value="2006">2006 to 2007, or earlier</option>
                <option value="2007">2007 to 2008, or later</option>
              </>
            )}
          </Select>
        </>
      )}

      {firstRepaymentDateRequired && (
        <Input
          id="firstRepaymentDate"
          type="date"
          label="First repayment date"
          onChange={(e) => setFirstRepaymentDate(e.target.value)}
        />
      )}

      <Button
        style="primary"
        disabled={!formValid()}
        wrapperClass="mt-2"
        type="submit"
      >
        Save
      </Button>
    </form>
  );
};

export default LoanInput;
