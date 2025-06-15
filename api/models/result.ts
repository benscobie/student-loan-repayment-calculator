import { DateTime } from 'luxon'
import Projection from './projection'

type Result = {
  period: number
  periodDate: DateTime
  salary: number
  projections: Projection[]
  aggregatedDebtRemaining: number
  aggregatedPaidInPeriod: number
  aggregatedInterestAppliedInPeriod: number
  aggregatedTotalInterestApplied: number
  aggregatedTotalPaid: number
}
export default Result
