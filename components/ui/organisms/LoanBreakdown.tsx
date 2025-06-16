import type { NextPage } from 'next'
import React from 'react'
import LoanType, { LoanTypeToDescription } from '../../../models/loanType'
import GraphHeader from '../molecules/GraphHeader'
import { Results } from '../../../api/models/results'
import LoanRepaymentNarrative from '../molecules/LoanRepaymentNarrative'
import classNames from 'classnames'
import { MonthLoanTable } from '../molecules/MonthLoanTable'
import { GraphUp, Table } from 'react-bootstrap-icons'
import TotalsGraph from '../molecules/TotalsGraph'

type LoanBreakdownProps = {
  results: Results
  loanType: LoanType
}

enum ResultType {
  Chart,
  Table,
}

const LoanBreakdown: NextPage<LoanBreakdownProps> = ({ results, loanType }) => {
  const [resultType, setResultType] = React.useState<ResultType>(
    ResultType.Chart,
  )

  return (
    <div>
      <h3 className="mb-5 text-2xl font-medium ">
        Your{' '}
        <span className="underline decoration-pink-500 decoration-4 underline-offset-8">
          {LoanTypeToDescription(loanType)}
        </span>{' '}
        results
      </h3>
      <div>
        <LoanRepaymentNarrative loanType={loanType} results={results} />
      </div>

      <div className="mt-8 flex h-9">
        <button
          className={classNames(
            'px-5 rounded-l-lg font-medium flex items-center gap-x-2 h-full',
            resultType == ResultType.Chart
              ? 'bg-sky-600 text-white'
              : 'bg-slate-100 hover:bg-slate-200',
          )}
          onClick={() => setResultType(ResultType.Chart)}
        >
          <GraphUp />
          Graph
        </button>
        <button
          className={classNames(
            'px-5 rounded-r-lg font-medium flex items-center gap-x-2 h-full',
            resultType == ResultType.Table
              ? 'bg-sky-600 text-white'
              : 'bg-slate-100 hover:bg-slate-200',
          )}
          onClick={() => setResultType(ResultType.Table)}
        >
          <Table />
          Table
        </button>
      </div>

      {resultType == ResultType.Chart && (
        <div className="mt-2">
          <GraphHeader text="Debt Remaining Over Time" />
          <TotalsGraph results={results} loanTypes={[loanType]} />
        </div>
      )}

      {resultType == ResultType.Table && (
        <div className="mt-6">
          <MonthLoanTable
            key={loanType}
            loanType={loanType}
            results={results}
          />
        </div>
      )}
    </div>
  )
}

export default LoanBreakdown
