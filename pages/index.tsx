import type { NextPage } from 'next'
import Head from 'next/head'
import React, { useRef, useState } from 'react'
import { Loan, NewLoan } from '../models/loan'
import { axios } from '../utils/axios'
import { useTracking } from '../features/tracking/useTracking'
import Button from '../components/ui/atoms/Button'
import LoanInput from '../components/ui/organisms/LoanInput'
import LoanType, { LoanTypeToDescription } from '../models/loanType'
import { InfoCircle } from 'react-bootstrap-icons'
import { Results, isProblemDetails } from '../api/models/results'
import LoanBreakdown from '../components/ui/organisms/LoanBreakdown'
import { currencyFormatter } from '../utils/currencyFormatter'
import { Details } from '../models/details'
import DetailsInput from '../components/ui/organisms/DetailsInput'
import Assumptions from '../models/assumptions'
import { Container } from '../components/ui/atoms/Container'
import GraphHeader from '../components/ui/molecules/GraphHeader'
import BalanceGraph from '../components/ui/molecules/BalanceGraph'
import { HttpStatusCode, isAxiosError } from 'axios'

const getDateWithoutTimezone = (date: Date) => {
  const tzOffset = date.getTimezoneOffset() * 60000
  return new Date(date.getTime() - tzOffset).toISOString()
}

const types = [
  LoanType.Type1,
  LoanType.Type2,
  LoanType.Type4,
  LoanType.Postgraduate,
  LoanType.Type5,
]

const assumptions: Assumptions = {
  annualEarningsGrowth: 0.042,
  salaryGrowth: 0.05,
}

const Home: NextPage = () => {
  const [loanData, setLoanData] = useState<Loan[]>([])
  const [editingLoan, setEditingLoan] = useState<NewLoan | null>({
    id: new Date().getTime(),
    loanType: LoanType.Unselected,
    studyingPartTime: false,
  })
  const [calculationResults, setCalculationResults] = useState<Results>()
  const [calculating, setCalculating] = useState<boolean>()
  const [calculationError, setCalculationError] = useState<string>()
  const detailsSubmitRef = useRef<HTMLButtonElement>(null)
  const tracking = useTracking()
  const canCalculate = editingLoan == null && loanData.length > 0
  const availableLoanTypes = types.filter((type) => {
    return !loanData.some((loan) => loan.loanType == type)
  })

  const updateLoan = (loan: Loan) => {
    const loanExists = loanData.some((x) => x.id == loan.id)

    if (loanExists) {
      setLoanData((current) =>
        current.map((obj) => {
          if (obj.id == loan.id) {
            setEditingLoan(null)
            return loan
          }

          return obj
        }),
      )
    } else {
      if (editingLoan != null) {
        setLoanData((current) => [...current, loan])
        setEditingLoan(null)
      }
    }
  }

  const cancelLoanInput = () => {
    setEditingLoan(null)
  }

  const addAnotherLoan = () => {
    setEditingLoan({
      id: new Date().getTime(),
      loanType: LoanType.Unselected,
      studyingPartTime: false,
    })
  }

  const removeLoan = (index: number) => {
    setLoanData((prev) => {
      const newLoans = prev.filter((_, i) => index !== i)

      if (newLoans.length == 0) {
        addAnotherLoan()
      }

      return newLoans
    })
  }

  const editLoan = (index: number) => {
    setEditingLoan(loanData[index])
  }

  const calculateSubmit = () => {
    detailsSubmitRef.current?.click()
  }

  const handleDetailsSubmit = async (details: Details) => {
    await calculate(details)
  }

  const calculate = async (details: Details) => {
    if (calculating) return

    setCalculationError(undefined)
    setCalculationResults(undefined)
    setCalculating(true)

    const request = {
      annualSalaryBeforeTax: details.annualSalaryBeforeTax,
      birthDate: details.birthDate
        ? getDateWithoutTimezone(details.birthDate)
        : undefined,
      salaryGrowth: details.salaryGrowth / 100,
      annualEarningsGrowth: details.annualEarningsGrowth / 100,
      loans: loanData.map((loan) => ({
        loanType: loan.loanType,
        balanceRemaining: loan.balanceRemaining,
        academicYearLoanTakenOut: loan.academicYearLoanTakenOut,
        studyingPartTime: loan.studyingPartTime,
        courseStartDate: loan.courseStartDate
          ? getDateWithoutTimezone(loan.courseStartDate)
          : undefined,
        courseEndDate: loan.courseEndDate
          ? getDateWithoutTimezone(loan.courseEndDate)
          : undefined,
      })),
      salaryAdjustments: details.salaryAdjustments.map((x) => {
        return { date: getDateWithoutTimezone(x.date), value: x.value }
      }),
    }

    try {
      const response = await axios.post<Results>('/api/calculate', request, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })

      tracking
        .track('calculate', { types: loanData.map((x) => x.loanType) })
        .catch(() => {
          // Ignore
        })
      setCalculationResults(response.data)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (!error.response) {
          setCalculationError(
            'A network error occurred, please check your internet connection and try again.',
          )
        } else {
          if (
            error.response.status === HttpStatusCode.BadRequest &&
            isProblemDetails(error.response.data)
          ) {
            setCalculationError(
              error.response.data.detail ?? error.response.data.title,
            )
          } else {
            setCalculationError(
              'An error occurred while calculating. Please try again later.',
            )
          }
          throw error
        }
      } else {
        setCalculationError(
          'An error occurred while calculating. Please try again.',
        )
        throw error
      }
    } finally {
      setCalculating(false)
    }
  }

  const calculatedLoanTypes =
    calculationResults?.results[0].projections.map((x) => x.loanType) ?? []
  const multipleLoanTypes = calculatedLoanTypes.length > 1

  return (
    <>
      <Head>
        <title>UK Student Loan Repayment Calculator</title>
        <meta
          name="description"
          content="A free UK student loan repayment calculator. Calculate time left, amount to be paid and interest for plans 1, 2, 4, 5 and postgraduate loan."
        />
      </Head>
      <div>
        <Container>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            <div className="mb-3">
              <h2 className="mb-4 text-2xl font-medium">
                UK Student Loan Repayment Calculator
              </h2>
              <p>This calculator can be used to find out:</p>
              <ul className="my-1 ml-2 list-inside list-disc space-y-1">
                <li>How long it could take to repay your student loan</li>
                <li>
                  The potential repayment costs over the loan&apos;s duration
                </li>
                <li>How a change in salary could affect your repayments</li>
              </ul>
              <div className="mt-4 flex w-fit items-center space-x-2 rounded-md border-l-4 border-yellow-400 bg-yellow-100 p-2 text-sm text-yellow-800">
                <InfoCircle size={16} className="shrink-0"></InfoCircle>
                <p>
                  Please note that this calculator does not constitute financial
                  advice.
                </p>
              </div>

              <h3 className="mt-6 text-xl font-medium">How much do I repay?</h3>
              <p className="mt-2">
                For plans 1, 2, 4 and 5 your repayments equal 9% of your pre-tax
                earnings above the threshold. When you have more than one type
                the payment is split according to the repayment thresholds.
              </p>
              <p className="mt-2">
                For the postgraduate loan your repayments equal 6% of your
                pre-tax earnings above the threshold.
              </p>

              <h3 className="mt-6 text-xl font-medium">Should I pay it off?</h3>
              <p className="mt-2">
                MoneySavingExpert&apos;s Martin Lewis has a good article on
                figuring out whether it&apos;s worth paying off your loan early.
                You can find that article here:{' '}
                <a
                  className="break-words text-sky-700"
                  href="https://www.moneysavingexpert.com/students/student-loans-repay/"
                >
                  https://www.moneysavingexpert.com/students/student-loans-repay/
                </a>
              </p>
            </div>
            <div>
              <h2 className="mb-2 text-xl font-medium">Your plans</h2>
              <div className="border-t-2 border-sky-400 p-5 pb-6 shadow-[rgba(0,_0,_0,_0.1)_0px_4px_10px]">
                {loanData.length > 0 && (
                  <div className="mb-4 flex flex-col gap-2">
                    {loanData.map((loan, index) => (
                      <div key={loan.loanType} className="flex gap-4">
                        <div className="grow">
                          <div className="text-xl">
                            {LoanTypeToDescription(loan.loanType)}
                          </div>
                          <div>
                            {currencyFormatter.format(loan.balanceRemaining)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
                            onClick={() => {
                              editLoan(index)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="flex cursor-pointer items-center justify-center rounded-lg bg-slate-200 px-4 py-2 hover:bg-slate-300"
                            onClick={() => {
                              removeLoan(index)
                            }}
                          >
                            Delete
                          </button>
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
                    availableLoanTypes={availableLoanTypes}
                  />
                )}

                {editingLoan == null && availableLoanTypes.length > 0 && (
                  <Button
                    id="addAnotherLoan"
                    style="primary"
                    onClick={addAnotherLoan}
                  >
                    Add another plan
                  </Button>
                )}
              </div>

              <div className="mt-6 border-t-2 border-sky-400 p-5 pb-6 shadow-[rgba(0,_0,_0,_0.1)_0px_4px_10px]">
                <DetailsInput
                  annualEarningsGrowth={assumptions.annualEarningsGrowth}
                  salaryGrowth={assumptions.salaryGrowth}
                  loans={loanData}
                  submitRef={detailsSubmitRef}
                  handleSubmit={(details: Details) => {
                    void handleDetailsSubmit(details)
                  }}
                  canSubmit={canCalculate}
                />
              </div>

              <div className="mt-4 flex justify-center">
                <Button
                  id="calculate"
                  style="primary"
                  disabled={!canCalculate || calculating}
                  onClick={calculateSubmit}
                  className="max-w-md px-8 text-xl"
                >
                  Calculate
                </Button>
              </div>

              {calculationError && (
                <div className="mx-auto mt-4 w-fit rounded bg-red-50 px-4 py-1.5 text-center text-sm text-red-800">
                  {calculationError}
                </div>
              )}
            </div>
          </div>
        </Container>

        {calculationResults != null && (
          <>
            {calculatedLoanTypes.map((loanType) => {
              return (
                <Container key={loanType} className="mt-8">
                  <LoanBreakdown
                    results={calculationResults}
                    loanType={loanType}
                  />
                </Container>
              )
            })}

            {multipleLoanTypes && (
              <Container className="mt-8">
                <h3 className="mb-5 text-2xl font-medium ">
                  Your{' '}
                  <span className="underline decoration-pink-500 decoration-4 underline-offset-8">
                    combined
                  </span>{' '}
                  results
                </h3>
                <GraphHeader text="Debt Per Loan Type" />
                <BalanceGraph
                  results={calculationResults}
                  loanTypes={calculatedLoanTypes}
                />
              </Container>
            )}
          </>
        )}
      </div>
    </>
  )
}

export default Home
