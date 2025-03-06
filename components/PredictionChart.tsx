'use client'
// components/PredictionChart.tsx
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import 'chartjs-adapter-date-fns'
import { Currency } from '@/app/lib/definitions'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

type CryptoData = {
  date: string
  close: number
  prediction: number
}
type Props = {
    name: string  // e.g., 'btc'
    symbol: string  // e.g., 'BTC'
  }

export default function PredictionChart({ name, symbol }: Props) {
  
    if(name.length>0){
    const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    axios.get('/api/crypto-data/'+name)
      .then((res) => {
        const data: CryptoData[] = res.data

        // Prepare datasets
        const dates = data.map(item => new Date(item.date))
        const closePrices = data.map(item => item.close)
        
        // We want to show predictions as discrete markers.
        // For visualization, we multiply predictions by a factor to display them on a comparable scale
        const predictionMarkers = data.map(item => {
          // For example, if prediction is 1, display a marker at 5% above close price,
          // if -1, 5% below, if 0 then undefined (so not plotted)
          if (item.prediction === 1) return item.close * 1.05
          if (item.prediction === -1) return item.close * 0.95
          return null
        })

        setChartData({
          labels: dates,
          datasets: [
            {
              label: 'Close Price',
              data: closePrices,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.3,
              fill: false,
              yAxisID: 'y'
            },
            {
              label: 'Prediction Signal',
              data: predictionMarkers,
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              pointRadius: 5,
              showLine: false, // Display as scatter points\n              yAxisID: 'y'
            }
          ]
        })
      })
      .catch((err) => console.error(err))
  }, [name])

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Close Price vs. Model Prediction' }
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'day', tooltipFormat: 'PP' },
        title: { display: true, text: 'Date' }
      },
      y: {
        title: { display: true, text: 'Price' }
      }
    }
  }

  return (
    <div className="mt-4">
      {chartData ? <Line data={chartData} options={options} /> : <p>Loading chart...</p>}
    </div>
  )
}   else{
    <div>error
    </div>
}
}
