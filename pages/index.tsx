import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/ui/atoms/button";
import Input from "../components/ui/atoms/input";
import LoanInput from "../components/ui/organisms/loan-input";
import Loan from "../models/loan";
import LoanType, { LoanTypeToDescription } from "../models/loanType";
import { InfoCircle } from "react-bootstrap-icons";
import { Results } from "../api/models/results";
import { DateTime } from "luxon";
import getAxios from "../utils/useAxios";
import LoanBreakdown from "../components/ui/organisms/loan-breakdown";
import currencyFormatter from "../utils/currencyFormatter";
import AssumptionsInput from "../components/ui/organisms/assumptions-input";
import InputGroup from "../components/ui/atoms/input-group";
import Assumptions from "../api/models/assumptions";

interface HomeProps {
  assumptions: Assumptions;
}

const Home: NextPage<HomeProps> = ({ assumptions }) => {
  const [loanData, setLoanData] = React.useState<Loan[]>([]);
  const [birthDate, setBirthDate] = React.useState<DateTime>();
  const [annualSalaryBeforeTax, setAnnualSalaryBeforeTax] =
    React.useState<number>();
  const [editingLoan, setEditingLoan] = React.useState<Loan | null>({
    loanType: LoanType.Unselected,
    studyingPartTime: false,
  });
  const [salaryGrowth, setSalaryGrowth] = React.useState(
    assumptions.salaryGrowth
  );
  const [annualEarningsGrowth, setAnnualEarningsGrowth] = React.useState(
    assumptions.annualEarningsGrowth
  );

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
          loan.academicYearLoanTakenOut == 2006)
      ) {
        return true;
      }

      return false;
    });
  };

  const isBirthDateValid = () => {
    return birthDate!.startOf("day") < birthDateMustBeBefore.startOf("day");
  };

  const getAvailableLoanTypes = () => {
    const types = [
      LoanType.Type1,
      LoanType.Type2,
      LoanType.Type4,
      LoanType.Postgraduate,
      LoanType.Type5,
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
    setEditingLoan({ loanType: LoanType.Unselected, studyingPartTime: false });
  };

  const removeLoan = (index: number) => {
    let filteredArray = loanData.filter((_, i) => index !== i);
    setLoanData(filteredArray);

    if (filteredArray.length == 0) {
      addAnotherLoan();
    }
  };

  const editLoan = (index: number) => {
    setEditingLoan(loanData[index]);
  };

  const birthDateMustBeBefore = DateTime.now().minus({
    years: 15,
  });

  const canCalculate = () => {
    return (
      editingLoan == null &&
      loanData.length > 0 &&
      (!isBirthDateRequired() ||
        (isBirthDateRequired() && birthDate != null && isBirthDateValid())) &&
      annualSalaryBeforeTax != null &&
      annualSalaryBeforeTax > 0
    );
  };

  const calculate = async () => {
    console.log({
      annualSalaryBeforeTax: annualSalaryBeforeTax,
      birthDate: birthDate,
      salaryGrowth: salaryGrowth,
      annualEarningsGrowth: annualEarningsGrowth,
      loans: loanData.map((loan) => ({
        loanType: loan.loanType,
        balanceRemaining: loan.balanceRemaining,
        academicYearLoanTakenOut: loan.academicYearLoanTakenOut,
        studyingPartTime: loan.studyingPartTime,
        courseStartDate: loan.courseStartDate,
        courseEndDate: loan.courseEndDate,
      })),
    });

    const response = await getAxios().post<Results>(
      "/api/calculate",
      {
        annualSalaryBeforeTax: annualSalaryBeforeTax,
        birthDate: birthDate,
        salaryGrowth: salaryGrowth,
        annualEarningsGrowth: annualEarningsGrowth,
        loans: loanData.map((loan) => ({
          loanType: loan.loanType,
          balanceRemaining: loan.balanceRemaining,
          academicYearLoanTakenOut: loan.academicYearLoanTakenOut,
          studyingPartTime: loan.studyingPartTime,
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
        <title>UK Student Loan Repayment Calculator</title>
        <meta
          name="description"
          content="A free UK student loan repayment calculator. Calculate time left, amount to be paid and interest for plans 1, 2, 4, 5 and postgraduate loan."
        />
      </Head>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        <div className="mb-3">
          <h2 className="text-2xl mb-2">UK Student Loan Repayent Calculator</h2>
          <p>This calculator can be used to find out:</p>
          <ul className="list-disc list-inside ml-2 my-1">
            <li>How long it could take to repay your student loan</li>
            <li>The potential repayment costs over the loan&apos;s duration</li>
          </ul>
          <div className="p-2 bg-yellow-200 rounded-md text-yellow-800 text-sm mt-4 flex items-center jus border-l-4 border-yellow-400">
            <InfoCircle size={16} className="inline"></InfoCircle>
            <span className="ml-2">
              Please note that this calculator does not constitute financial
              advice.
            </span>
          </div>

          <h3 className="text-xl mt-6">How much do I repay?</h3>
          <p className="mt-2">
            For plans 1, 2 and 4 your repayments equal 9% of your pre-tax
            earnings above the threshold. When you have more than one type the
            payment is split according to the repayment thresholds.
          </p>
          <p className="mt-2">
            For the postgraduate loan your repayments equal 6% of your pre-tax
            earnings above the threshold.
          </p>

          <h3 className="text-xl mt-6">Should I pay it off?</h3>
          <p className="mt-2">
            MoneySavingExpert extrordinaire Martin Lewis has a good article on
            figuring out whether it&apos;s worth paying off your loan early. You
            can find the article here:{" "}
            <a
              className="text-sky-700"
              href="https://www.moneysavingexpert.com/students/student-loans-repay/"
            >
              https://www.moneysavingexpert.com/students/student-loans-repay/
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-2xl mb-2">Your plans</h2>
          <div className="p-5 pb-6 border-t-2 border-sky-400 shadow-[rgba(0,_0,_0,_0.1)_0px_4px_10px]">
            {loanData.length > 0 && (
              <div className="flex flex-col gap-2 mb-4">
                {loanData.map((element, index) => (
                  <div
                    key={element.loanType?.toString()}
                    className="flex gap-4"
                  >
                    <div className="flex-grow">
                      <div className="text-xl">
                        {LoanTypeToDescription(element.loanType)}
                      </div>
                      <div>
                        {currencyFormatter().format(
                          element.balanceRemaining ?? 0
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                        onClick={() => editLoan(index)}
                      >
                        Edit
                      </div>
                      <div
                        className="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 flex items-center justify-center cursor-pointer"
                        onClick={() => removeLoan(index)}
                      >
                        Delete
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

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
              >
                Add another plan
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6 p-5 pb-6 border-t-2 border-sky-400 shadow-[rgba(0,_0,_0,_0.1)_0px_4px_10px]">
            <div>
              <h2 className="mb-2 text-lg">Your details</h2>
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
                <div className="mt-2">
                  <Input
                    id="birthDate"
                    type="date"
                    label="Birth Date"
                    tooltip="Your birth date is used to calculate when the loan can be written off."
                    value={birthDate?.toISODate() || ""}
                    error={
                      birthDate != null && !isBirthDateValid()
                        ? `Select a date prior to ${birthDateMustBeBefore.toFormat(
                            "dd/MM/yyyy"
                          )}`
                        : undefined
                    }
                    onChange={(e) =>
                      setBirthDate(DateTime.fromISO(e.target.value))
                    }
                  />
                </div>
              )}
            </div>
            <div>
              <h2 className="mb-2 text-lg">Assumptions</h2>
              <AssumptionsInput
                onSalaryGrowthChange={onSalaryGrowthChange}
                onAnnualEarningsGrowthChange={onAnnualEarningsGrowthChange}
                salaryGrowth={salaryGrowth}
                annualEarningsGrowth={annualEarningsGrowth}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button
              id="calculate"
              style="primary"
              disabled={!canCalculate()}
              onClick={calculate}
              className="max-w-md text-xl px-8"
            >
              Calculate
            </Button>
          </div>
        </div>
      </div>

      {calculationResults != null && (
        <div className="mt-12">
          <div className="flex justify-center">
            <h1 className="text-2xl mb-4 px-10 py-1 bg-pink-500 text-white rounded-lg font-bold">
              Your results
            </h1>
          </div>
          <LoanBreakdown
            results={calculationResults}
            loanTypes={calculationResults.results[0].projections.map(
              (x) => x.loanType
            )}
          />
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(process.env.API_URL + `/ukstudentloans/assumptions`);
  const assumptions = await res.json();

  return {
    props: {
      assumptions,
    },
  };
}

export default Home;
