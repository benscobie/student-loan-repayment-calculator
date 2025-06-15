import LoanType from '../../models/loanType'
import RepaymentStatus from '../../models/repaymentStatus'

type Projection = {
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
export default Projection
