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
  CoreScaleOptions,
  Scale,
  Tick,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LoanType, { LoanTypeToDescription } from "../../../models/loanType";
import {
  getLabelsForGroupedDataCallback,
  groupDataEveryNthPeriod,
} from "./graphUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TotalsGraphProps {
  results: Results;
  loanTypes: LoanType[];
}

const TotalsGraph = (props: TotalsGraphProps) => {
  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback(
            this: Scale<CoreScaleOptions>,
            tickValue: string | number,
            index: number,
            ticks: Tick[]
          ): string {
            return getLabelsForGroupedDataCallback(
              props.results.results,
              this.getLabelForValue(index)
            );
          },
          autoSkip: false,
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

  const groupedData = groupDataEveryNthPeriod(props.results.results);

  const dataSetsPerLoanType = [
    {
      label: "Toal Paid",
      data: groupedData.data.map((x) => x.aggregatedTotalPaid),
      borderColor: "rgb(21, 128, 61)",
      backgroundColor: "rgb(21, 128, 61)",
    },
    {
      label: "Debt Remaining",
      data: groupedData.data.map((x) => x.aggregatedDebtRemaining),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgb(255, 99, 132)",
    },
  ];

  const data = {
    labels: groupedData.labels,
    datasets: dataSetsPerLoanType,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default TotalsGraph;
