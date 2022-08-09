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

interface TotalsGraphProps {
  results: Results;
  loanTypes: LoanType[];
}

const TotalsGraph = (props: TotalsGraphProps) => {
  const periods = props.results.results.map((x) => x.period);
  const labels = props.results.results.map((x) => x.periodDate);

  const dataSetsPerLoanType = [
    {
      label: "Toal Paid",
      data: periods.map((period) =>
        props.results.results
          .find((r) => r.period == period)
          ?.projections.reduce((sum, current) => sum + current.totalPaid, 0)
      ),
      borderColor: "rgb(21, 128, 61)",
      backgroundColor: "rgb(21, 128, 61)",
    },
    {
      label: "Debt Remaining",
      data: periods.map((period) =>
        props.results.results
          .find((r) => r.period == period)
          ?.projections.reduce((sum, current) => sum + current.debtRemaining, 0)
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132)",
    },
  ];

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

export default TotalsGraph;
