import { DateTime } from "luxon";
import { NextPage } from "next";
import React, { useEffect } from "react";
import Loan from "../../../models/loan";
import LoanType from "../../../models/loanType";
import Button from "../atoms/button";
import Checkbox from "../atoms/checkbox";
import Input from "../atoms/input";
import InputGroup from "../atoms/input-group";
import Select from "../atoms/select";

interface LoanInputProps {
  loan: Loan;
  onChange: Function;
  onCancel: Function;
  availableLoanTypes: LoanType[];
  canCancel: boolean;
}

const LoanInput: NextPage<LoanInputProps> = ({
  loan,
  onChange,
  onCancel,
  canCancel,
  availableLoanTypes,
}) => {
  const [loanType, setLoanType] = React.useState(loan.loanType);
  const [balanceRemaining, setBalanceRemaining] = React.useState(
    loan.balanceRemaining
  );
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({
      loanType,
      balanceRemaining,
      academicYearLoanTakenOut,
      courseStartDate,
      courseEndDate,
      firstRepaymentDate,
      studyingPartTime,
    });
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
    if (loanType == null || loanType == LoanType.Unselected) {
      return false;
    }

    if (balanceRemaining == null || balanceRemaining <= 0) {
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
        value={loanType || LoanType.Unselected}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setLoanType(LoanType[e.target.value as keyof typeof LoanType])
        }
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

      <InputGroup
        id="balanceRemaining"
        type="number"
        label="Balance remaining"
        value={balanceRemaining || ""}
        wrapperClass="mt-1"
        symbol="£"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBalanceRemaining(parseInt(e.target.value))
        }
      />

      {loanType == LoanType.Type2 && (
        <>
          <Input
            id="courseStartDate"
            type="date"
            label="Course start date"
            value={courseStartDate?.toISODate() || ""}
            wrapperClass="mt-1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourseStartDate(DateTime.fromISO(e.target.value))
            }
          />

          <Input
            id="courseEndDate"
            type="date"
            label="Course end date"
            value={courseEndDate?.toISODate() || ""}
            wrapperClass="mt-1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCourseEndDate(DateTime.fromISO(e.target.value))
            }
          />
        </>
      )}

      {academicYearLoanTakenOutRequired && (
        <>
          <Select
            id="academicYearLoanTakenOut"
            label="Academic Year Loan Taken Out"
            value={academicYearLoanTakenOut || ""}
            wrapperClass="mt-1"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAcademicYearLoanTakenOut(parseInt(e.target.value))
            }
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
          tooltip="Your first repayment date is used to calculate when the loan can be written off."
          wrapperClass="mt-1"
          value={firstRepaymentDate?.toISODate() || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFirstRepaymentDate(DateTime.fromISO(e.target.value))
          }
        />
      )}

      {loanType == LoanType.Type2 && (
        <Checkbox
          id="studyingPartTime"
          label="Studying part-time"
          checked={studyingPartTime || false}
          wrapperClass="mt-1"
          onChange={(e) => setSudyingPartTime(e.target.checked)}
        />
      )}

      <div className="mt-2">
        <Button
          id="submit"
          style="primary"
          disabled={!formValid()}
          wrapperClass="inline"
          className="mr-2"
          type="submit"
        >
          Save
        </Button>

        {canCancel && (
          <Button
            id="submit"
            style="cancel"
            wrapperClass="inline"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};

export default LoanInput;
