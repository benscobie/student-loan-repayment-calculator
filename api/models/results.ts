import { DateTime } from 'luxon'
import Result from './result'

type Results = {
  results: Result[]
  debtClearedDate: DateTime
  debtClearedNumberOfPeriods: number
  totalPaid: number
  totalInterestApplied: number
}
export default Results
