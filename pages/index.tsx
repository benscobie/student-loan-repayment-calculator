import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/ui/atoms/button";
import Input from "../components/ui/atoms/input";
import LoanInput from "../components/ui/organisms/loan-input";
import Loan from "../models/loan";
import LoanType, { LoanTypeToDescription } from "../models/loanType";
import { InfoCircle, PencilFill, TrashFill } from "react-bootstrap-icons";
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
    let filteredArray = loanData.filter((_, i) => index !== i);
    setLoanData(filteredArray);

    if (filteredArray.length == 0) {
      addAnotherLoan();
    }
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-3">
          <h2 className="text-2xl mb-2">UK Student Loan Repayent Calculator</h2>
          <p>This calculator can be used to find out:</p>
          <ul className="list-disc list-inside ml-2 my-1">
            <li>How long it could take to repay your student loan</li>
            <li>The potential repayment costs over the loan&apos;s duration</li>
          </ul>
          <div className="p-2 bg-yellow-200 rounded-md text-yellow-800 mt-2">
            <InfoCircle size={16} className="inline"></InfoCircle>
            <span className="ml-2">
              Please note that this calculator does not constitute financial
              advice.
            </span>
          </div>

          <h3 className="text-xl mt-4 mb-1">How much do I repay?</h3>
          <p className="py-1">
            For plans 1, 2 and 4 your repayments equal 9% of your pre-tax
            earnings above the threshold. When you have more than one type the
            payment is split according to the repayment thresholds.
          </p>
          <p className="py-1">
            For the postgraduate loan your repayments equal 6% of your pre-tax
            earnings above the threshold.
          </p>

          <h3 className="text-xl mt-4 b-1">Should I pay it off?</h3>
          <p className="py-1">
            MoneySavingExpert extrordinaire Martin Lewis has a good article on
            figuring out whether it&apos;s worth paying off your loan early. You
            can find the article here:{" "}
            <a href="https://www.moneysavingexpert.com/students/student-loans-repay/">
              https://www.moneysavingexpert.com/students/student-loans-repay/
            </a>
          </p>
        </div>
        <div>
          <h2 className="text-2xl mb-2">Your Plans</h2>

          {loanData && (
            <div>
              {loanData.map((element, index) => (
                <div key={element.loanType?.toString()} className="my-2 flex">
                  <div className="w-28">
                    <div className="text-lg">
                      {LoanTypeToDescription(element.loanType)}
                    </div>
                    <div>
                      {currencyFormatter().format(
                        element.balanceRemaining ?? 0
                      )}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <PencilFill
                      className="inline cursor-pointer text-slate-600 hover:text-slate-700"
                      size={20}
                      onClick={() => editLoan(index)}
                      title="Edit"
                    />
                    <TrashFill
                      className="inline ml-3 cursor-pointer text-red-600 hover:text-red-700"
                      size={20}
                      onClick={() => removeLoan(index)}
                      title="Delete"
                    />
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
              className="mt-2"
            >
              Add another loan
            </Button>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div>
              <h2 className="mb-2 text-2xl">Your Details</h2>
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
                  onChange={(e) =>
                    setBirthDate(DateTime.fromISO(e.target.value))
                  }
                />
              )}
            </div>
            <div>
              <h2 className="mb-2 text-2xl">Assumptions</h2>
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
        </div>
      </div>

      {calculationResults != null && (
        <div className="mt-2">
          <h1 className="text-2xl mb-2">Your Results</h1>
          <LoanBreakdown
            results={calculationResults}
            loanTypes={loanData.map((x) => x.loanType!)}
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
