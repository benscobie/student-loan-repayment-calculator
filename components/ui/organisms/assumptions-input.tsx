import { NextPage } from "next";
import React, { useEffect } from "react";
import { useAssumptions } from "../../../api/data/assumptions";
import Input from "../atoms/input";

interface AssumptionsInputProps {
  salaryGrowth: number;
  annualEarningsGrowth: number;
  onSalaryGrowthChange: (value: number) => void;
  onAnnualEarningsGrowthChange: (value: number) => void;
}

const AssumptionsInput: NextPage<AssumptionsInputProps> = ({
  onSalaryGrowthChange,
  onAnnualEarningsGrowthChange,
}) => {
  const { assumptions, isLoading, isError } = useAssumptions();

  const handleSalaryGrowthChange = (value: string) => {
    const salaryGrowth = parseFloat(value) / 100;

    onSalaryGrowthChange(salaryGrowth);
  };

  const handleAnnualEarningsGrowth = (value: string) => {
    const annualEarningsGrowth = parseFloat(value) / 100;

    onAnnualEarningsGrowthChange(annualEarningsGrowth);
  };

  // This feels like this isn't the correct way of achieving this
  useEffect(() => {
    if (assumptions != null) {
      onSalaryGrowthChange(assumptions.salaryGrowth);
      onAnnualEarningsGrowthChange(assumptions.annualEarningsGrowth);
    }
  }, []);

  return (
    <div>
      <Input
        id="salaryGrowth"
        type="number"
        label="Annual salary growth"
        min="-100"
        max="100"
        step="0.1"
        disabled={isLoading}
        defaultValue={assumptions != null ? assumptions.salaryGrowth * 100 : ""}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSalaryGrowthChange(e.target.value)
        }
      />

      <Input
        id="annualEarningsGrowth"
        type="number"
        label="UK average annual earnings growth"
        tooltip="Repayment thresholds usually rise in line with average annual earnings."
        wrapperClass="mt-1"
        min="-100"
        max="100"
        step="0.1"
        disabled={isLoading}
        defaultValue={
          assumptions != null ? assumptions.annualEarningsGrowth * 100 : ""
        }
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleAnnualEarningsGrowth(e.target.value)
        }
      />
    </div>
  );
};

export default AssumptionsInput;
