import { NextApiRequest, NextApiResponse } from 'next'
import Results from '../../api/models/results'
import { axios } from '../../utils/axios'
import LoanType from '../../models/loanType'
import { HttpStatusCode, isAxiosError } from 'axios'

type LoanBody = {
  loanType: LoanType
  balanceRemaining?: number
  academicYearLoanTakenOut?: number
  studyingPartTime: boolean
  courseStartDate?: Date
  courseEndDate?: Date
}

type SalaryAdjustment = {
  date: Date
  value: number
}

type RequestBody = {
  annualSalaryBeforeTax: number
  birthDate?: Date
  salaryGrowth: number
  annualEarningsGrowth: number
  loans: LoanBody[]
  salaryAdjustments: SalaryAdjustment[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Results>,
) {
  if (req.method === 'POST') {
    const body = req.body as RequestBody

    try {
      const response = await axios.post<Results>(
        `${process.env.API_URL}/ukstudentloans/calculate`,
        JSON.stringify(body),
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )

      res.status(HttpStatusCode.Ok).json(response.data)
    } catch (error: unknown) {
      if (isAxiosError(error) && error.response?.status) {
        res.status(error.response.status).end()
        return
      }

      throw error
    }
  } else {
    res.status(HttpStatusCode.MethodNotAllowed).end()
  }
}
