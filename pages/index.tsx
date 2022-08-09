import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/ui/atoms/button";
import Input from "../components/ui/atoms/input";
import LoanInput from "../components/loan-input";
import Loan from "../models/loan";
import LoanType, { LoanTypeToDescription } from "../models/loanType";
import { Plus } from "react-bootstrap-icons";
import { Results } from "../models/api/results";
import BalanceGraph from "../components/ui/molecules/balanceGraph";
import TotalsGraph from "../components/ui/molecules/totalsGraph";

const Home: NextPage = () => {
  const [loanData, setLoanData] = React.useState<Loan[]>([]);
  const [birthDate, setBirthDate] = React.useState<Date>();
  const [annualSalaryBeforeTax, setAnnualSalaryBeforeTax] =
    React.useState<number>();
  const [editingLoan, setEditingLoan] = React.useState<Loan | null>({
    loanType: LoanType.Unselected,
  });

  const [calculationResults, setCalculationResults] = React.useState<Results>();

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
    var loanExists = loanData.some((x) => x.loanType == loan.loanType);

    if (loanExists) {
      setLoanData((current) =>
        current.map((obj) => {
          if (obj.loanType == loan.loanType) {
            setEditingLoan(null);
            return loan;
          }

          return obj;
        })
      );
    } else {
      if (editingLoan != null) {
        setLoanData((current) => [...current, loan]);
        setEditingLoan(null);
      }
    }
  };

  const addAnotherLoan = () => {
    setEditingLoan({ loanType: LoanType.Unselected });
  };

  const removeLoan = (index: number) => {
    let filteredArray = loanData.filter((item, i) => index !== i);
    setLoanData(filteredArray);
  };

  const editLoan = (index: number) => {
    setEditingLoan(loanData[index]);
  };

  const calculate = async () => {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/ukstudentloans/calculate",
      {
        method: "POST",
        body: JSON.stringify({
          annualSalaryBeforeTax: annualSalaryBeforeTax,
          birthDate: birthDate,
          loans: loanData.map((loan) => ({
            loanType: loan.loanType,
            balanceRemaining: loan.balanceRemaining,
            firstRepaymentDate: loan.firstRepaymentDate,
            academicYearLoanTakenOut: loan.academicYearLoanTakenOut,
            studyingPartTime: loan.studyingPartTime ?? false,
            courseStartDate: loan.courseStartDate,
            courseEndDate: loan.courseEndDate,
          })),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    if (response.ok) {
      const data = (await response.json()) as Results;
      setCalculationResults(data);
    }
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

      {loanData &&
        loanData.map((element, index) => (
          <div key={element.loanType?.toString()}>
            <h2>
              {LoanTypeToDescription(element.loanType)} - £
              {element.balanceRemaining}
            </h2>
            <a onClick={() => editLoan(index)}>Edit</a>
            <a onClick={() => removeLoan(index)}>Remove</a>
          </div>
        ))}

      {editingLoan != null && (
        <LoanInput
          loan={editingLoan}
          onChange={updateLoan}
          availableLoanTypes={getAvailableLoanTypes()}
        />
      )}

      {editingLoan == null && getAvailableLoanTypes().length > 0 && (
        <Button id="addAnotherLoan" style="primary" onClick={addAnotherLoan}>
          Add another loan <Plus className="inline" size={24} />
        </Button>
      )}

      <h2 className="mt-4 text-2xl">Your Details</h2>

      <Input
        id="annualSalaryBeforeTax"
        type="number"
        label="Annual Salary Before Tax"
        onChange={(e) => setAnnualSalaryBeforeTax(parseInt(e.target.value))}
      />

      {isBirthDateRequired() && (
        <Input
          id="birthDate"
          type="date"
          label="Birth Date"
          onChange={(e) => setBirthDate(new Date(e.target.value))}
        />
      )}

      <Button
        id="calculate"
        wrapperClass="mt-2"
        style="primary"
        disabled={editingLoan != null || loanData.length === 0}
        onClick={calculate}
      >
        Calculate
      </Button>

      {calculationResults != null && (
        <>
          <div className="columns-1 md:columns-2">
            <BalanceGraph
              results={calculationResults}
              loanTypes={loanData.map((x) => x.loanType!)}
            />
            <TotalsGraph
              results={calculationResults}
              loanTypes={loanData.map((x) => x.loanType!)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
