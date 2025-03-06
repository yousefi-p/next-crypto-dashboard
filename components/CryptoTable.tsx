// components/CryptoTable.tsx
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Currency } from '@/app/lib/definitions'


type CryptoData = {
  date: string
  close: number
  volume: number
  prediction: number
}

type Props = {
    name: string  // currency name in lowercase e.g., 'btc'
    symbol: string  // display symbol e.g., 'BTC'
  }

export default function CryptoTable({ name, symbol }: Props) {
  
  if(name.length>0){
  const [data, setData] = useState<CryptoData[]>([])

  useEffect(() => {
    axios.get('/api/crypto-data/'+name)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [name])

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Date</th>
          <th>Close Price</th>
          <th>Volume</th>
          <th>Prediction</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>{item.close}</td>
            <td>{item.volume}</td>
            {item.prediction === 1 ? <td className="text-success">Buy</td>: item.prediction === -1 ? <td className="text-danger">Sell</td> : <td className="text-info">Hold</td>}

          </tr>
        ))}
      </tbody>
    </table>
  )
} else{
    <div>Error</div>
}
}
