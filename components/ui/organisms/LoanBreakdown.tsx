import type { NextPage } from "next";
import React from "react";
import LoanType, { LoanTypeToDescription } from "../../../models/loanType";
import BalanceGraph from "../molecules/BalanceGraph";
import GraphHeader from "../molecules/GraphHeader";
import TotalsGraph from "../molecules/TotalsGraph";
import { Results } from "../../../api/models/results";
import LoanRepaymentNarrative from "../molecules/LoanRepaymentNarrative";
import classNames from "classnames";
import { MonthLoanTable } from "../molecules/MonthLoanTable";

interface LoanBreakdownProps {
  results: Results;
  loanTypes: LoanType[];
}

const LoanBreakdown: NextPage<LoanBreakdownProps> = ({
  results,
  loanTypes,
}) => {
  return (
    <div>
      <div className={classNames("grid grid-cols-1 lg:grid-cols-2 gap-4")}>
        {loanTypes.map((loanType) => (
          <div className="w-full" key={loanType}>
            {loanTypes.length > 1 && (
              <h3 className="mb-2 text-xl">
                {LoanTypeToDescription(loanType)}
              </h3>
            )}
            <div className="border py-3 px-3 rounded-md bg-gray-50">
              <LoanRepaymentNarrative loanType={loanType} results={results} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-8">
        {(results.results.find((x) => x.period == 1)?.projections.length ?? 0) >
          1 && (
          <div>
            <GraphHeader text="Debt Per Loan Type" />
            <BalanceGraph results={results} loanTypes={loanTypes} />
          </div>
        )}
        <div>
          <GraphHeader text="Debt Remaining Over Time" />
          <TotalsGraph results={results} loanTypes={loanTypes} />
        </div>
      </div>

      {loanTypes.map((loanType) => (
        <MonthLoanTable key={loanType} loanType={loanType} results={results} />
      ))}
    </div>
  );
};

export default LoanBreakdown;
