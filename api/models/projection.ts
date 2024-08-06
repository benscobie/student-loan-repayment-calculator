import LoanType from '../../models/loanType'
import RepaymentStatus from '../../models/repaymentStatus'

export default interface Projection {
  repaymentStatus: RepaymentStatus
  loanType: LoanType
  debtRemaining: number
  interestRate: number
  paid: number
  interestApplied: number
  totalPaid: number
  totalInterestApplied: number
  threshold: number
}
