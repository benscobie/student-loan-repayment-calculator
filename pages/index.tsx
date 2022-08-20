import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/ui/atoms/button";
import Input from "../components/ui/atoms/input";
import LoanInput from "../components/ui/organisms/loan-input";
import Loan from "../models/loan";
import LoanType, { LoanTypeToDescription } from "../models/loanType";
import { PencilFill, Plus, TrashFill } from "react-bootstrap-icons";
import { Results } from "../api/models/results";
import { DateTime } from "luxon";
import getAxios from "../utils/useAxios";
import LoanBreakdown from "../components/ui/organisms/loan-breakdown";
import currencyFormatter from "../utils/currencyFormatter";
import AssumptionsInput from "../components/ui/organisms/assumptions-input";
import InputGroup from "../components/ui/atoms/input-group";

const Home: NextPage = () => {
  const [loanData, setLoanData] = React.useState<Loan[]>([]);
  const [birthDate, setBirthDate] = React.useState<DateTime>();
  const [annualSalaryBeforeTax, setAnnualSalaryBeforeTax] =
    React.useState<number>();
  const [editingLoan, setEditingLoan] = React.useState<Loan | null>({
    loanType: LoanType.Unselected,
  });
  const [salaryGrowth, setSalaryGrowth] = React.useState(0);
  const [annualEarningsGrowth, setAnnualEarningsGrowth] = React.useState(0);

  const [calculationResults, setCalculationResults] = React.useState<Results>();

  const onSalaryGrowthChange = (value: number) => {
    setSalaryGrowth(value);
  };

  const onAnnualEarningsGrowthChange = (value: number) => {
    setAnnualEarningsGrowth(value);
  };

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

  const cancelLoanInput = () => {
    setEditingLoan(null);
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

  const canCalculate = () => {
    return (
      editingLoan == null &&
      loanData.length > 0 &&
      (!isBirthDateRequired() ||
        (isBirthDateRequired() && birthDate != null)) &&
      annualSalaryBeforeTax != null &&
      annualSalaryBeforeTax > 0
    );
  };

  const calculate = async () => {
    const response = await getAxios().post<Results>(
      process.env.NEXT_PUBLIC_API_URL + "/ukstudentloans/calculate",
      {
        annualSalaryBeforeTax: annualSalaryBeforeTax,
        birthDate: birthDate,
        salaryGrowth: salaryGrowth,
        annualEarningsGrowth: annualEarningsGrowth,
        loans: loanData.map((loan) => ({
          loanType: loan.loanType,
          balanceRemaining: loan.balanceRemaining,
          firstRepaymentDate: loan.firstRepaymentDate,
          academicYearLoanTakenOut: loan.academicYearLoanTakenOut,
          studyingPartTime: loan.studyingPartTime ?? false,
          courseStartDate: loan.courseStartDate,
          courseEndDate: loan.courseEndDate,
        })),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    setCalculationResults(response.data);
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

      <h1 className="text-2xl mb-1">Your Plans</h1>

      {loanData &&
        loanData.map((element, index) => (
          <div key={element.loanType?.toString()}>
            <h2>
              {LoanTypeToDescription(element.loanType)} -{" "}
              {currencyFormatter().format(element.balanceRemaining ?? 0)}
              <PencilFill
                className="inline ml-2 cursor-pointer"
                size={16}
                onClick={() => editLoan(index)}
              />
              <TrashFill
                className="inline ml-2 cursor-pointer"
                size={16}
                onClick={() => removeLoan(index)}
              />
            </h2>
          </div>
        ))}

      {editingLoan != null && (
        <LoanInput
          key={editingLoan.loanType}
          loan={editingLoan}
          onChange={updateLoan}
          onCancel={cancelLoanInput}
          canCancel={loanData.length > 0}
          availableLoanTypes={getAvailableLoanTypes()}
        />
      )}

      {editingLoan == null && getAvailableLoanTypes().length > 0 && (
        <Button
          id="addAnotherLoan"
          style="primary"
          onClick={addAnotherLoan}
          className="mt-2"
        >
          Add another loan <Plus className="inline" size={24} />
        </Button>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <h2 className="mt-2 mb-1 text-2xl">Your Details</h2>
          <InputGroup
            id="annualSalaryBeforeTax"
            type="number"
            label="Annual salary before tax"
            value={annualSalaryBeforeTax || ""}
            symbol="£"
            onChange={(e) =>
              setAnnualSalaryBeforeTax(
                e.target.value.length == 0
                  ? undefined
                  : parseInt(e.target.value)
              )
            }
          />

          {isBirthDateRequired() && (
            <Input
              id="birthDate"
              type="date"
              label="Birth Date"
              wrapperClass="mt-2"
              tooltip="Your birth date is used to calculate when the loan can be written off."
              value={birthDate?.toISODate() || ""}
              onChange={(e) => setBirthDate(DateTime.fromISO(e.target.value))}
            />
          )}
        </div>
        <div>
          <h2 className="mt-2 mb-1 text-2xl">Assumptions</h2>
          <AssumptionsInput
            onSalaryGrowthChange={onSalaryGrowthChange}
            onAnnualEarningsGrowthChange={onAnnualEarningsGrowthChange}
            salaryGrowth={salaryGrowth}
            annualEarningsGrowth={annualEarningsGrowth}
          />
        </div>
      </div>

      <div>
        <Button
          id="calculate"
          wrapperClass="mt-2"
          style="primary"
          disabled={!canCalculate()}
          onClick={calculate}
        >
          Calculate
        </Button>
      </div>

      {calculationResults != null && (
        <div className="mt-2">
          <h1 className="text-2xl mb-1">Your Results</h1>
          <LoanBreakdown
            results={calculationResults}
            loanTypes={loanData.map((x) => x.loanType!)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
