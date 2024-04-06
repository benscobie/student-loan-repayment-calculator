import type { NextPage } from "next";
import React from "react";
import LoanType from "../../../models/loanType";
import { Results } from "../../../api/models/results";
import {
  currencyFormatter,
  currencyFormatterNoFraction,
} from "../../../utils/currencyFormatter";

interface MonthLoanTableProps {
  results: Results;
  loanType: LoanType;
}

export const MonthLoanTable: NextPage<MonthLoanTableProps> = ({
  results,
  loanType,
}) => {
  const periodCompleteIndex = results.results.findIndex((r) =>
    r.projections.find(
      (p) =>
        p.loanType == loanType &&
        (p.repaymentStatus == "WrittenOff" || p.repaymentStatus == "PaidOff")
    )
  )!;

  return (
    <div className="overflow-x-auto overflow-y-auto w-fit">
      <table className="text-sm border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border rounded-tl-md font-semibold">
              Month
            </th>
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border font-semibold">
              Paid
            </th>
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border font-semibold">
              Interest added
            </th>
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border font-semibold">
              Debt remaining
            </th>
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border font-semibold">
              Interest rate
            </th>
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border font-semibold">
              Repayment threshold
            </th>
            <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border rounded-tr-md font-semibold">
              Income
            </th>
          </tr>
        </thead>
        <tbody>
          {results.results.slice(0, periodCompleteIndex).map((result) => {
            const projection = result.projections.find(
              (x) => x.loanType == loanType
            )!;

            return (
              <tr
                key={result.period}
                className="[&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-md"
              >
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                  {result.periodDate.toFormat("LLLL yyyy")}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                  {currencyFormatter.format(projection.paid)}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                  {currencyFormatter.format(projection.interestApplied)}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                  {currencyFormatter.format(projection.debtRemaining)}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                  {projection.interestRate * 100}%
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                  {currencyFormatterNoFraction.format(projection.threshold)}
                </td>
                <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-x">
                  {currencyFormatter.format(result.salary)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
