import { Results } from '../../../api/models/results'
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
import LoanType, { LoanTypeToDescription } from '../../../models/loanType'
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

type BalanceGraphProps = {
  results: Results
  loanTypes: LoanType[]
}

const BalanceGraph = (props: BalanceGraphProps) => {
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

  const colors = [
    'rgb(255, 99, 132)',
    'rgb(37, 150, 190)',
    'rgb(234, 182, 118)',
    'rgb(136, 118, 234)',
  ]
  const backgroundColors = [
    'rgb(255, 99, 132)',
    'rgb(37, 150, 190)',
    'rgb(234, 182, 118)',
    'rgb(136, 118, 234)',
  ]

  const groupedData = groupDataEveryNthPeriod(props.results.results)

  const dataSetsPerLoanType = props.loanTypes.map((loanType, index) => ({
    label: LoanTypeToDescription(loanType),
    data: groupedData.data.map(
      (x) => x.projections.find((p) => p.loanType == loanType)?.debtRemaining,
    ),
    borderColor: colors[index],
    backgroundColor: backgroundColors[index],
  }))

  const data = { labels: groupedData.labels, datasets: dataSetsPerLoanType }

  return (
    <div className="h-[500px] w-full">
      <Line options={options} data={data} />
    </div>
  )
}

export default BalanceGraph
