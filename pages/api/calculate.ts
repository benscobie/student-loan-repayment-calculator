import { NextApiRequest, NextApiResponse } from "next";
import { Results } from "../../api/models/results";
import { axios } from "../../utils/axios";
import LoanType from "../../models/loanType";

type LoanBody = {
  loanType: LoanType;
  balanceRemaining?: number;
  academicYearLoanTakenOut?: number;
  studyingPartTime: boolean;
  courseStartDate?: Date;
  courseEndDate?: Date;
};

type SalaryAdjustment = {
  date: Date;
  value: number;
};

type RequestBody = {
  annualSalaryBeforeTax: number;
  birthDate?: Date;
  salaryGrowth: number;
  annualEarningsGrowth: number;
  loans: LoanBody[];
  salaryAdjustments: SalaryAdjustment[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Results>
) {
  if (req.method === "POST") {
    const body = req.body as RequestBody;
    const response = await axios.post<Results>(
      `${process.env.API_URL}/ukstudentloans/calculate`,
      JSON.stringify(body),
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    res.status(200).json(response.data);
  } else {
    res.status(405).end();
  }
}
