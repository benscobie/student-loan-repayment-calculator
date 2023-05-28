import SalaryAdjustment from "./salaryAdjustment";

export type Details = {
  annualSalaryBeforeTax?: number;
  salaryGrowth: number;
  annualEarningsGrowth: number;
  birthDate?: Date;
  salaryAdjustments: SalaryAdjustment[];
};
