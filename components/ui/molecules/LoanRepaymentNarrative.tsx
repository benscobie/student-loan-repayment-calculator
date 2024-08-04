import type { NextPage } from "next";
import React from "react";
import { DateTime } from "luxon";
import LoanType from "../../../models/loanType";
import { Results } from "../../../api/models/results";
import Highlight from "../atoms/Highlight";
import { currencyFormatter } from "../../../utils/currencyFormatter";
import { RepaymentStatusToDescription } from "../../../models/repaymentStatus";

interface LoanRepaymentNarrativeProps {
  results: Results;
  loanType: LoanType;
}

const LoanRepaymentNarrative: NextPage<LoanRepaymentNarrativeProps> = ({
  results,
  loanType,
}) => {
  const periodComplete = results.results.find((r) =>
    r.projections.find(
      (p) =>
        p.loanType == loanType &&
        (p.repaymentStatus == "WrittenOff" || p.repaymentStatus == "PaidOff")
    )
  )!;
  const periodCompleteProjection = periodComplete.projections.find(
    (p) => p.loanType == loanType
  )!;

  const paidOffDiff = () => {
    const paidOff = periodComplete.periodDate;

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

  const explainer = (
    <>
      The loan will be{" "}
      {RepaymentStatusToDescription(
        periodCompleteProjection.repaymentStatus
      ).toLowerCase()}{" "}
      in{" "}
    </>
  );

  return (
    <>
      <p className="mb-3">
        {paidOffDiff().years > 0 && paidOffDiff().months > 0 && (
          <>
            {explainer}
            <Highlight>
              {formattedYearText()} and {formattedMonthText()}
            </Highlight>
          </>
        )}
        {paidOffDiff().years > 0 && paidOffDiff().months == 0 && (
          <>
            {explainer}
            <Highlight>{formattedYearText()}</Highlight>
          </>
        )}
        {paidOffDiff().years == 0 && paidOffDiff().months > 0 && (
          <>
            {explainer}
            <Highlight>{formattedMonthText()}</Highlight>
          </>
        )}
        , with the last payment date being in{" "}
        <Highlight>{periodComplete.periodDate.toFormat("LLLL yyyy")}</Highlight>
        .
      </p>
      <p>
        There is{" "}
        <Highlight>
          {currencyFormatter.format(periodCompleteProjection.totalPaid)}
        </Highlight>{" "}
        remaining to pay, with{" "}
        <Highlight>
          {currencyFormatter.format(
            periodCompleteProjection.totalInterestApplied
          )}
        </Highlight>{" "}
        of that being interest.
      </p>
    </>
  );
};

export default LoanRepaymentNarrative;
