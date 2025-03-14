// components/CryptoTable.tsx
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'


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

  const [data, setData] = useState<CryptoData[]>([])
  useEffect(() => {
    axios.get('/api/crypto-data/' + name)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err))
  }, [name])
  
  if (name === null || name.length === 0) {
    <div>Error</div>
  } else {



    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Close Price for {symbol} in $</th>
            <th>Volume</th>
            <th>Prediction</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.date).getFullYear() + '-' + (new Date(item.date).getMonth() + 1) + '-' + new Date(item.date).getDate()}</td>
              <td>{item.close !== null ? "$" + item.close : "-"}</td>
              <td>{item.volume}</td>
              {item.prediction === 1 ? <td className="text-success">Buy</td> : item.prediction === -1 ? <td className="text-danger">Sell</td> : <td className="text-info">Hold</td>}

            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}
