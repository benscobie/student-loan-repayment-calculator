import { NextPage } from "next";
import { ChangeEvent } from "react";
import InputGroup from "../atoms/input-group";

interface AssumptionsInputProps {
  salaryGrowth: number;
  annualEarningsGrowth: number;
  onSalaryGrowthChange: (value: number) => void;
  onAnnualEarningsGrowthChange: (value: number) => void;
}

const AssumptionsInput: NextPage<AssumptionsInputProps> = ({
  salaryGrowth,
  annualEarningsGrowth,
  onSalaryGrowthChange,
  onAnnualEarningsGrowthChange,
}) => {
  const handleSalaryGrowthChange = (value: string) => {
    const salaryGrowth = parseFloat(value) / 100;

    onSalaryGrowthChange(salaryGrowth);
  };

  const handleAnnualEarningsGrowth = (value: string) => {
    const annualEarningsGrowth = parseFloat(value) / 100;

    onAnnualEarningsGrowthChange(annualEarningsGrowth);
  };

  return (
    <div>
      <InputGroup
        id="salaryGrowth"
        type="number"
        label="Annual salary growth"
        min="-100"
        max="100"
        step="0.1"
        symbol="%"
        defaultValue={salaryGrowth * 100}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSalaryGrowthChange(e.target.value)
        }
      />

      <InputGroup
        id="annualEarningsGrowth"
        type="number"
        label="UK average annual earnings growth"
        tooltip="Repayment thresholds usually rise in line with average annual earnings."
        wrapperClass="mt-3"
        min="-100"
        max="100"
        step="0.1"
        symbol="%"
        defaultValue={annualEarningsGrowth * 100}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleAnnualEarningsGrowth(e.target.value)
        }
      />
    </div>
  );
};

export default AssumptionsInput;
