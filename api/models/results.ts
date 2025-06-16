import { DateTime } from 'luxon'
import Result from './result'

export type Results = {
  results: Result[]
  debtClearedDate: DateTime
  debtClearedNumberOfPeriods: number
  totalPaid: number
  totalInterestApplied: number
}

export const isProblemDetails = (obj: unknown): obj is ProblemDetails => {
  return typeof obj === 'object' && obj != null && 'title' in obj
}

export type ProblemDetails = {
  title: string
  detail?: string
}
