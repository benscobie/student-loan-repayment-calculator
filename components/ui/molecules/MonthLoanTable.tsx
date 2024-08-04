import type { NextPage } from "next";
import React, { useCallback } from "react";
import LoanType from "../../../models/loanType";
import { Results } from "../../../api/models/results";
import {
  currencyFormatter,
  currencyFormatterNoFraction,
} from "../../../utils/currencyFormatter";
import Result from "../../../api/models/result";
import classNames from "classnames";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";

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

  const completedResults = results.results.slice(0, periodCompleteIndex);
  const paging = usePager(completedResults);

  return (
    <div>
      <div className="overflow-x-auto w-full">
        <table className="text-sm border-separate border-spacing-0 min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border border-r-0 rounded-tl-md font-semibold">
                Month
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border border-r-0 font-semibold">
                Paid
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border border-r-0 font-semibold">
                Interest added
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border border-r-0 font-semibold">
                Debt remaining
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border border-r-0 font-semibold">
                Interest rate
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border border-r-0 font-semibold">
                Repayment threshold
              </th>
              <th className="px-2 sm:px-3 md:px-4 py-1.5 text-left border rounded-tr-md font-semibold">
                Income
              </th>
            </tr>
          </thead>
          <tbody>
            {paging.pageResults.map((result, index) => {
              const projection = result.projections.find(
                (x) => x.loanType == loanType
              )!;
              const prevResult = results.results.find(
                (x) => x.period == result.period - 1
              );
              const prevPrevResult = results.results.find(
                (x) => x.period == result.period - 2
              );
              const prevProjection = prevResult?.projections.find(
                (x) => x.loanType == loanType
              )!;
              const prevPrevProjection = prevPrevResult?.projections.find(
                (x) => x.loanType == loanType
              )!;

              const salaryChange =
                !prevResult || prevResult.salary == result.salary
                  ? null
                  : prevResult.salary < result.salary
                    ? "up"
                    : "down";
              const thresholdChange =
                !prevProjection ||
                prevProjection.threshold == projection.threshold
                  ? null
                  : prevProjection.threshold < projection.threshold
                    ? "up"
                    : "down";

              const debtDecreasedFirstTime =
                prevPrevProjection?.debtRemaining <
                  prevProjection?.debtRemaining &&
                prevProjection?.debtRemaining > projection.debtRemaining;

              const increasedFirstTime =
                prevPrevProjection?.debtRemaining >
                  prevProjection?.debtRemaining &&
                prevProjection?.debtRemaining < projection.debtRemaining;

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
                    {debtDecreasedFirstTime && (
                      <span className="text-sm font-bold ml-2 text-green-600">
                        ↓
                      </span>
                    )}
                    {increasedFirstTime && (
                      <span className="text-sm font-bold ml-2 text-red-500">
                        ↑
                      </span>
                    )}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                    {projection.interestRate * 100}%
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-l">
                    {currencyFormatterNoFraction.format(projection.threshold)}
                    {thresholdChange && (
                      <span
                        className={classNames(
                          "text-sm font-bold ml-2",
                          thresholdChange == "up"
                            ? "text-green-600"
                            : "text-red-500"
                        )}
                      >
                        {thresholdChange == "up" ? "↑" : "↓"}
                      </span>
                    )}
                  </td>
                  <td className="px-2 sm:px-3 md:px-4 py-1.5 border-b border-x">
                    {currencyFormatter.format(result.salary)}
                    {salaryChange && (
                      <span
                        className={classNames(
                          "text-sm font-bold ml-2",
                          salaryChange == "up"
                            ? "text-green-600"
                            : "text-red-500"
                        )}
                      >
                        {salaryChange == "up" ? "↑" : "↓"}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination total={completedResults.length} {...paging} />
      </div>
    </div>
  );
};

const usePager = (results: Result[]) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);

  const updateItemsPerPage = useCallback(
    (itemsPerPage: number) => {
      setItemsPerPage(itemsPerPage);
      const newLastPage = Math.ceil(results.length / itemsPerPage);

      if (currentPage > newLastPage) {
        setCurrentPage(newLastPage);
      }
    },
    [currentPage, results.length]
  );

  const pageResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  return {
    pageResults,
    currentPage,
    itemsPerPage,
    setItemsPerPage: updateItemsPerPage,
    setCurrentPage,
  };
};

type PaginationProps = {
  total: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  itemsPerPage: number;
  itemsPerPageOptions?: number[];
};

const Pagination = ({
  total,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  itemsPerPageOptions = [10, 20, 30, 40, 50],
}: PaginationProps) => {
  const pageCount = Math.ceil(total / itemsPerPage);
  const canGoBack = currentPage > 1;
  const canGoForward = currentPage < pageCount;

  let pagesToDistribute = 4;
  const pages = [currentPage];

  let i = 1;
  while (pagesToDistribute > 0) {
    let currentPagesToDistribute = pagesToDistribute;
    if (currentPage - i > 0) {
      pages.push(currentPage - i);
      pagesToDistribute--;
    }

    if (currentPage + i <= pageCount) {
      pages.push(currentPage + i);
      pagesToDistribute--;
    }

    if (pagesToDistribute == currentPagesToDistribute) {
      break;
    }

    i++;
  }

  pages.sort((a, b) => a - b);

  return (
    <div className="flex flex-col-reverse w-full gap-6 sm:flex-row items-center sm:items-center sm:justify-between">
      <div className="flex items-center gap-x-6 gap-y-1 text-sm">
        <div className="flex min-h-8 items-center gap-x-2 gap-y-1">
          <label htmlFor="records-per-page">Rows per page</label>
          <select
            id="records-per-page"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="h-8 px-2.5 border bg-gray-50 text-gray-900 font-light text-sm rounded  "
          >
            {itemsPerPageOptions.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className="flex min-h-8 items-center">
          <span>
            {currentPage * itemsPerPage - itemsPerPage + 1}-
            {currentPage * itemsPerPage} of {total}
          </span>
        </div>
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => setCurrentPage(1)}
          className={classNames("px-3 h-8 rounded", {
            "text-gray-300": !canGoBack,
            "hover:bg-sky-100": canGoBack,
          })}
          disabled={!canGoBack}
        >
          <ChevronDoubleLeft />
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage(currentPage - 1)}
          className={classNames("px-3 h-8 rounded", {
            "text-gray-300": !canGoBack,
            "hover:bg-sky-100": canGoBack,
          })}
          disabled={!canGoBack}
        >
          <ChevronLeft />
        </button>

        {pages.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => setCurrentPage(number)}
            className={classNames(
              "px-3 h-8 rounded text-center hidden sm:block",
              {
                "border border-sky-600 bg-sky-600 hover:bg-sky-700 hover:border-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none text-white":
                  number == currentPage,
                "hover:bg-sky-100": number != currentPage,
              }
            )}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          onClick={() => setCurrentPage(currentPage + 1)}
          className={classNames("px-3 h-8 rounded", {
            "text-gray-300": !canGoForward,
            "hover:bg-sky-100": canGoForward,
          })}
          disabled={!canGoForward}
        >
          <ChevronRight />
        </button>

        <button
          type="button"
          onClick={() => setCurrentPage(pageCount)}
          className={classNames("px-3 h-8 rounded", {
            "text-gray-300": !canGoForward,
            "hover:bg-sky-100": canGoForward,
          })}
          disabled={!canGoForward}
        >
          <ChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};
