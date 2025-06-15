import LoanType from './loanType'

export type NewLoan = {
  id: number
  balanceRemaining?: number
  loanType?: LoanType
  academicYearLoanTakenOut?: number
  studyingPartTime: boolean
  courseStartDate?: Date
  courseEndDate?: Date
}

export type Loan = {
  id: number
  balanceRemaining: number
  loanType: LoanType
  academicYearLoanTakenOut?: number
  studyingPartTime: boolean
  courseStartDate?: Date
  courseEndDate?: Date
}
