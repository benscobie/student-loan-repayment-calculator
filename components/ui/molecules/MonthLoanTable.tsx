import type { NextPage } from 'next'
import React, { useCallback } from 'react'
import LoanType from '../../../models/loanType'
import Results from '../../../api/models/results'
import {
  currencyFormatter,
  currencyFormatterNoFraction,
} from '../../../utils/currencyFormatter'
import Result from '../../../api/models/result'
import classNames from 'classnames'
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
} from 'react-bootstrap-icons'
import { percentFormatter } from '../../../utils/percentFormatter'
import RepaymentStatus from '../../../models/repaymentStatus'

type MonthLoanTableProps = {
  results: Results
  loanType: LoanType
}

export const MonthLoanTable: NextPage<MonthLoanTableProps> = ({
  results,
  loanType,
}) => {
  const periodCompleteIndex = results.results.findIndex((r) =>
    r.projections.find(
      (p) =>
        p.loanType == loanType &&
        (p.repaymentStatus == RepaymentStatus.WrittenOff ||
          p.repaymentStatus == RepaymentStatus.PaidOff),
    ),
  )

  const completedResults = results.results.slice(0, periodCompleteIndex + 1)
  const paging = usePager(completedResults)

  return (
    <div>
      <div className="w-full overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="rounded-tl-md border border-r-0 px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Month
              </th>
              <th className="border border-r-0 px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Paid
              </th>
              <th className="border border-r-0 px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Interest added
              </th>
              <th className="border border-r-0 px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Debt remaining
              </th>
              <th className="border border-r-0 px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Interest rate
              </th>
              <th className="border border-r-0 px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Repayment threshold
              </th>
              <th className="rounded-tr-md border px-2 py-1.5 text-left font-semibold sm:px-3 md:px-4">
                Income
              </th>
            </tr>
          </thead>
          <tbody>
            {paging.pageResults.map((result) => {
              const projection = result.projections.find(
                (x) => x.loanType == loanType,
              )

              if (!projection) {
                throw new Error('Projection not found')
              }

              const prevResult = results.results.find(
                (x) => x.period == result.period - 1,
              )
              const prevPrevResult = results.results.find(
                (x) => x.period == result.period - 2,
              )
              const prevProjection = prevResult?.projections.find(
                (x) => x.loanType == loanType,
              )
              const prevPrevProjection = prevPrevResult?.projections.find(
                (x) => x.loanType == loanType,
              )

              const salaryChange =
                !prevResult || prevResult.salary == result.salary
                  ? null
                  : prevResult.salary < result.salary
                    ? 'up'
                    : 'down'
              const thresholdChange =
                !prevProjection ||
                prevProjection.threshold == projection.threshold
                  ? null
                  : prevProjection.threshold < projection.threshold
                    ? 'up'
                    : 'down'

              const debtDecreasedFirstTime =
                prevProjection && prevPrevProjection
                  ? prevPrevProjection.debtRemaining <
                      prevProjection.debtRemaining &&
                    prevProjection.debtRemaining > projection.debtRemaining
                  : false

              const increasedFirstTime =
                prevProjection && prevPrevProjection
                  ? prevPrevProjection.debtRemaining >
                      prevProjection.debtRemaining &&
                    prevProjection.debtRemaining < projection.debtRemaining
                  : false

              return (
                <tr
                  key={result.period}
                  className="[&:last-child>td:first-child]:rounded-bl-md [&:last-child>td:last-child]:rounded-br-md"
                >
                  <td className="border-b border-l px-2 py-1.5 sm:px-3 md:px-4">
                    {result.periodDate.toFormat('LLLL yyyy')}
                  </td>
                  <td className="border-b border-l px-2 py-1.5 sm:px-3 md:px-4">
                    {currencyFormatter.format(projection.paid)}
                  </td>
                  <td className="border-b border-l px-2 py-1.5 sm:px-3 md:px-4">
                    {currencyFormatter.format(projection.interestApplied)}
                  </td>
                  <td className="border-b border-l px-2 py-1.5 sm:px-3 md:px-4">
                    {currencyFormatter.format(projection.debtRemaining)}
                    {debtDecreasedFirstTime && (
                      <span className="ml-2 text-sm font-bold text-green-600">
                        ↓
                      </span>
                    )}
                    {increasedFirstTime && (
                      <span className="ml-2 text-sm font-bold text-red-500">
                        ↑
                      </span>
                    )}
                  </td>
                  <td className="border-b border-l px-2 py-1.5 sm:px-3 md:px-4">
                    {percentFormatter.format(projection.interestRate)}
                  </td>
                  <td className="border-b border-l px-2 py-1.5 sm:px-3 md:px-4">
                    {currencyFormatterNoFraction.format(projection.threshold)}
                    {thresholdChange && (
                      <span
                        className={classNames(
                          'text-sm font-bold ml-2',
                          thresholdChange == 'up'
                            ? 'text-green-600'
                            : 'text-red-500',
                        )}
                      >
                        {thresholdChange == 'up' ? '↑' : '↓'}
                      </span>
                    )}
                  </td>
                  <td className="border-x border-b px-2 py-1.5 sm:px-3 md:px-4">
                    {currencyFormatter.format(result.salary)}
                    {salaryChange && (
                      <span
                        className={classNames(
                          'text-sm font-bold ml-2',
                          salaryChange == 'up'
                            ? 'text-green-600'
                            : 'text-red-500',
                        )}
                      >
                        {salaryChange == 'up' ? '↑' : '↓'}
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination total={completedResults.length} {...paging} />
      </div>
    </div>
  )
}

const usePager = (results: Result[]) => {
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage, setItemsPerPage] = React.useState(10)

  const updateItemsPerPage = useCallback(
    (itemsPerPage: number) => {
      setItemsPerPage(itemsPerPage)
      const newLastPage = Math.ceil(results.length / itemsPerPage)

      if (currentPage > newLastPage) {
        setCurrentPage(newLastPage)
      }
    },
    [currentPage, results.length],
  )

  const pageResults = results.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage,
  )

  return {
    pageResults,
    currentPage,
    itemsPerPage,
    setItemsPerPage: updateItemsPerPage,
    setCurrentPage,
  }
}

type PaginationProps = {
  total: number
  currentPage: number
  setCurrentPage: (page: number) => void
  setItemsPerPage: (itemsPerPage: number) => void
  itemsPerPage: number
  itemsPerPageOptions?: number[]
}

const Pagination = ({
  total,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  itemsPerPageOptions = [10, 20, 30, 40, 50],
}: PaginationProps) => {
  const pageCount = Math.ceil(total / itemsPerPage)
  const canGoBack = currentPage > 1
  const canGoForward = currentPage < pageCount

  let pagesToDistribute = 4
  const pages = [currentPage]

  let i = 1
  while (pagesToDistribute > 0) {
    const currentPagesToDistribute = pagesToDistribute
    if (currentPage - i > 0) {
      pages.push(currentPage - i)
      pagesToDistribute--
    }

    if (currentPage + i <= pageCount) {
      pages.push(currentPage + i)
      pagesToDistribute--
    }

    if (pagesToDistribute == currentPagesToDistribute) {
      break
    }

    i++
  }

  pages.sort((a, b) => a - b)

  return (
    <div className="flex w-full flex-col-reverse items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-x-6 gap-y-1 text-sm">
        <div className="flex min-h-8 items-center gap-x-2 gap-y-1">
          <label htmlFor="records-per-page">Rows per page</label>
          <select
            id="records-per-page"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value))
            }}
            className="h-8 rounded border bg-gray-50 px-2.5 text-sm font-light text-gray-900  "
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
          onClick={() => {
            setCurrentPage(1)
          }}
          className={classNames('px-3 h-8 rounded', {
            'text-gray-300': !canGoBack,
            'hover:bg-sky-100': canGoBack,
          })}
          disabled={!canGoBack}
        >
          <ChevronDoubleLeft />
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(currentPage - 1)
          }}
          className={classNames('px-3 h-8 rounded', {
            'text-gray-300': !canGoBack,
            'hover:bg-sky-100': canGoBack,
          })}
          disabled={!canGoBack}
        >
          <ChevronLeft />
        </button>

        {pages.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => {
              setCurrentPage(number)
            }}
            className={classNames(
              'px-3 h-8 rounded text-center hidden sm:block',
              {
                'border border-sky-600 bg-sky-600 hover:bg-sky-700 hover:border-sky-700 focus:ring-2 focus:ring-sky-500 focus:outline-none text-white':
                  number == currentPage,
                'hover:bg-sky-100': number != currentPage,
              },
            )}
          >
            {number}
          </button>
        ))}

        <button
          type="button"
          onClick={() => {
            setCurrentPage(currentPage + 1)
          }}
          className={classNames('px-3 h-8 rounded', {
            'text-gray-300': !canGoForward,
            'hover:bg-sky-100': canGoForward,
          })}
          disabled={!canGoForward}
        >
          <ChevronRight />
        </button>

        <button
          type="button"
          onClick={() => {
            setCurrentPage(pageCount)
          }}
          className={classNames('px-3 h-8 rounded', {
            'text-gray-300': !canGoForward,
            'hover:bg-sky-100': canGoForward,
          })}
          disabled={!canGoForward}
        >
          <ChevronDoubleRight />
        </button>
      </div>
    </div>
  )
}
