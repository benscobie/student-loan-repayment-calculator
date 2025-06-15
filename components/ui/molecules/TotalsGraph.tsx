import Results from '../../../api/models/results'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Scale,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import LoanType from '../../../models/loanType'
import {
  getLabelsForGroupedDataCallback,
  groupDataEveryNthPeriod,
} from './graphUtils'
import { currencyFormatter } from '../../../utils/currencyFormatter'
import { DateTime } from 'luxon'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

type TotalsGraphProps = {
  results: Results
  loanTypes: LoanType[]
}

const TotalsGraph = (props: TotalsGraphProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          callback(
            this: Scale,
            tickValue: string | number,
            index: number,
          ): string {
            return getLabelsForGroupedDataCallback(
              props.results.results,
              this.getLabelForValue(index),
            )
          },
          autoSkip: false,
        },
      },
    },
    plugins: {
      legend: { position: 'top' as const },
      title: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label ?? ''

            if (label) {
              label += ': '
            }

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- I have seen this null before
            if (context.parsed.y !== null) {
              label += currencyFormatter.format(context.parsed.y)
            }

            return label
          },
          title: function (context) {
            const date = DateTime.fromISO(context[0].label)
            return date.toLocaleString()
          },
        },
      },
    },
  }

  const groupedData = groupDataEveryNthPeriod(props.results.results)

  const dataSetsPerLoanType = [
    {
      label: 'Toal Paid',
      data: groupedData.data.map((x) => x.aggregatedTotalPaid),
      borderColor: 'rgb(21, 128, 61)',
      backgroundColor: 'rgb(21, 128, 61)',
    },
    {
      label: 'Debt Remaining',
      data: groupedData.data.map((x) => x.aggregatedDebtRemaining),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgb(255, 99, 132)',
    },
  ]

  const data = { labels: groupedData.labels, datasets: dataSetsPerLoanType }

  return (
    <div className="h-[500px] w-full">
      <Line options={options} data={data} />
    </div>
  )
}

export default TotalsGraph
