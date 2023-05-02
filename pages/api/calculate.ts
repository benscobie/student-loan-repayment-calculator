import { NextApiRequest, NextApiResponse } from "next";
import { Results } from "../../api/models/results";
import getAxios from "../../utils/useAxios";
import { DateTime } from "luxon";
import LoanType from "../../models/loanType";

type LoanBody = {
  loanType: LoanType;
  balanceRemaining?: number;
  firstRepaymentDate?: DateTime;
  academicYearLoanTakenOut?: number;
  studyingPartTime?: boolean;
  courseStartDate?: DateTime;
  courseEndDate?: DateTime;
};

type RequestBody = {
  annualSalaryBeforeTax?: number;
  birthDate?: DateTime;
  salaryGrowth: number;
  annualEarningsGrowth: number;
  loans: LoanBody[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Results>
) {
  if (req.method === "POST") {
    const body = req.body as RequestBody;
    const response = await getAxios().post<Results>(
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
