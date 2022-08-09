import { Results } from "../../../models/api/results";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LoanType, { LoanTypeToDescription } from "../../../models/loanType";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        callback(val: number, index: number): string {
          var date = new Date(this.getLabelForValue(val));

          if (date.getMonth() == 0) {
            return date.getFullYear().toString();
          }

          return "";
        },
      },
    },
  },
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
    },
  },
};

interface BalanceGraphProps {
  results: Results;
  loanTypes: LoanType[];
}

const BalanceGraph = (props: BalanceGraphProps) => {
  const periods = props.results.results.map((x) => x.period);
  const labels = props.results.results.map((x) => x.periodDate);

  const colors = [
    "rgb(255, 99, 132)",
    "rgb(37, 150, 190)",
    "rgb(234, 182, 118)",
    "rgb(136, 118, 234)",
  ];
  const backgroundColors = [
    "rgb(255, 99, 132)",
    "rgb(37, 150, 190)",
    "rgb(234, 182, 118)",
    "rgb(136, 118, 234)",
  ];

  const dataSetsPerLoanType = props.loanTypes.map((loanType, index) => ({
    label: LoanTypeToDescription(loanType),
    data: periods.map(
      (period) =>
        props.results.results
          .find((r) => r.period == period)
          ?.projections.find((p) => p.loanType == loanType)?.debtRemaining
    ),
    borderColor: colors[index],
    backgroundColor: backgroundColors[index],
  }));

  const data = {
    labels,
    datasets: dataSetsPerLoanType,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default BalanceGraph;
