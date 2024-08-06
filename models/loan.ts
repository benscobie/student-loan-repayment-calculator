import LoanType from './loanType'

export interface NewLoan {
  id: number
  balanceRemaining?: number
  loanType?: LoanType
  academicYearLoanTakenOut?: number
  studyingPartTime: boolean
  courseStartDate?: Date
  courseEndDate?: Date
}

export interface Loan {
  id: number
  balanceRemaining: number
  loanType: LoanType
  academicYearLoanTakenOut?: number
  studyingPartTime: boolean
  courseStartDate?: Date
  courseEndDate?: Date
}
