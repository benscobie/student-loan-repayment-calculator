import type { NextPage } from "next";
import React from "react";
import { DateTime } from "luxon";
import LoanType from "../../../models/loanType";
import BalanceGraph from "../molecules/balanceGraph";
import GraphHeader from "../molecules/graphHeader";
import TotalsGraph from "../molecules/totalsGraph";
import { Results } from "../../../api/models/results";
import Highlight from "../atoms/highlight";
import currencyFormatter from "../../../utils/currencyFormatter";

interface LoanBreakdownProps {
  results: Results;
  loanTypes: LoanType[];
}

const LoanBreakdownProps: NextPage<LoanBreakdownProps> = ({
  results,
  loanTypes,
}) => {
  const paidOffDiff = () => {
    const paidOff = results.debtClearedDate;

    var now = DateTime.local();
    var rezoned = now.setZone(paidOff.zone, { keepLocalTime: true });

    return paidOff.diff(rezoned, ["years", "months"]);
  };

  const formattedYearText = () => {
    return `${paidOffDiff().years} year${paidOffDiff().years > 1 ? "s" : ""}`;
  };

  const formattedMonthText = () => {
    const months = Math.ceil(paidOffDiff().months);

    return `${months} month${months > 1 ? "s" : ""}`;
  };

  return (
    <div>
      <div className="border py-3 px-3 rounded-md bg-gray-50">
        <p>
          {paidOffDiff().years > 0 && paidOffDiff().months > 0 && (
            <>
              You will be debt free in{" "}
              <Highlight>
                {formattedYearText()} and {formattedMonthText()}
              </Highlight>
            </>
          )}
          {paidOffDiff().years > 0 && paidOffDiff().months == 0 && (
            <>
              You will be debt free in{" "}
              <Highlight>{formattedYearText()}</Highlight>
            </>
          )}
          {paidOffDiff().years == 0 && paidOffDiff().months > 0 && (
            <>
              You will be debt free in{" "}
              <Highlight>{formattedMonthText()}</Highlight>
            </>
          )}
          , with your last payment date being in{" "}
          <Highlight>{results.debtClearedDate.toFormat("LLLL yyyy")}</Highlight>
          .
        </p>
        <p className="mt-2">
          You will have a paid{" "}
          <Highlight>{currencyFormatter().format(results.totalPaid)}</Highlight>{" "}
          in total, of which{" "}
          <Highlight>
            {currencyFormatter().format(results.totalInterestPaid)}
          </Highlight>{" "}
          was interest.
        </p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-2">
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
