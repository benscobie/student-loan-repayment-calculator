import type { NextPage } from "next";
import React from "react";
import LoanType, { LoanTypeToDescription } from "../../../models/loanType";
import BalanceGraph from "../molecules/balanceGraph";
import GraphHeader from "../molecules/graphHeader";
import TotalsGraph from "../molecules/totalsGraph";
import { Results } from "../../../api/models/results";
import LoanRepaymentNarrative from "../molecules/loan-repayment-narrative";
import classNames from "classnames";

interface LoanBreakdownProps {
  results: Results;
  loanTypes: LoanType[];
}

const LoanBreakdownProps: NextPage<LoanBreakdownProps> = ({
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
    </div>
  );
};

export default LoanBreakdownProps;
