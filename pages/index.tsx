import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/button";
import Input from "../components/input";
import LoanInput from "../components/loan-input";
import Loan from "../models/loan";
import LoanType from "../models/loanType";

const Home: NextPage = () => {
  const [loanData, setLoanData] = React.useState<Loan[]>([]);
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [annualSalaryBeforeTax, setAnnualSalaryBeforeTax] = React.useState("");
  const [editingLoan, setEditingLoan] = React.useState<Loan | null>({
    loanType: LoanType.Unselected,
  });

  const isBirthDateRequired = () => {
    return loanData.some((loan) => {
      if (
        (loan.loanType == LoanType.Type1 &&
          loan.academicYearLoanTakenOut == 2005) ||
        (loan.loanType == LoanType.Type4 &&
          loan.academicYearLoanTakenOut == 2007)
      ) {
        return true;
      }

      return false;
    });
  };

  const getAvailableLoanTypes = () => {
    const types = [
      LoanType.Type1,
      LoanType.Type2,
      LoanType.Type4,
      LoanType.Postgraduate,
    ];

    var filterdTypes = types.filter((type) => {
      return !loanData.some((loan) => loan.loanType == type);
    });

    return filterdTypes;
  };

  const updateLoan = (loan: Loan) => {
    setLoanData((current) =>
      current.map((obj) => {
        if (obj.loanType == loan.loanType) {
          setEditingLoan(null);
          return { ...loan };
        }

        return obj;
      })
    );

    if (editingLoan != null) {
      setLoanData((current) => [...current, loan]);
    }

    setEditingLoan(null);
  };

  const addAnotherLoan = () => {
    setEditingLoan({ loanType: LoanType.Unselected });
  };

  return (
    <div>
      <Head>
        <title>Student Loan Repayment Calculator</title>
        <meta
          name="description"
          content="Calculate how long you have remaining, interest paid etc."
        />
      </Head>

      <h1 className="text-2xl">Your Plans</h1>

      {loanData.map((element, index) => {
        return index;
      })}

      {editingLoan != null && (
        <LoanInput
          loan={editingLoan}
          onChange={updateLoan}
          availableLoanTypes={getAvailableLoanTypes()}
        />
      )}

      {editingLoan == null && getAvailableLoanTypes().length > 0 && (
        <Button id="addAnotherLoan" style="primary" onClick={addAnotherLoan}>
          Add another loan
        </Button>
      )}

      <h2 className="mt-4 text-2xl">Your Details</h2>

      <Input
        id="annualSalaryBeforeTax"
        type="number"
        label="Annual Salary Before Tax"
        onChange={(e) => setAnnualSalaryBeforeTax(e.target.value)}
      />

      {isBirthDateRequired() && (
        <Input
          id="birthDate"
          type="date"
          label="Birth Date"
          onChange={(e) => setBirthDate(new Date(e.target.value))}
        />
      )}
    </div>
  );
};

export default Home;
