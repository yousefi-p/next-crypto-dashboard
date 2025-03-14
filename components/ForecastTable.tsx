// components/CryptoTable.tsx
'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'


type CryptoData = {
    date: string
    predictionSignal: number
    predicted_close: number | string
}

type Props = {
    name: string  // currency name in lowercase e.g., 'btc'
    symbol: string  // display symbol e.g., 'BTC'
}

export default function ForecastTable({ name, symbol }: Props) {
    const [data, setData] = useState<CryptoData[]>([])

    useEffect(() => {
        axios.get('/api/prediction/' + name.toLowerCase())
            .then((res) => {
                console.log(res.data[0]['predicted_close'])

                setData(res.data)
            })
            .catch((err) => console.error(err))
    }, [name])

    if (name === null || name.length === 0) {
        <div>Error</div>
    } else if (data.length > 0) {

        return (
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>{symbol} Forecast Table</th></tr>
                    <tr>
                        <th>Date</th>
                        <th>Prediction Signal</th>
                        <th>Prediction Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{new Date(item.date).getFullYear() + "-" + (new Date(item.date).getMonth() + 1) + "-" + new Date(item.date).getDate()}</td>
                            {item.predictionSignal === 1 ?
                                <td className="text-success">Buy</td> : item.predictionSignal === -1 ? <td className="text-danger">Sell</td> : <td className="text-info">Hold</td>}
                            <td>
                                {data[index]['predicted_close'] === null ? 'N/A' : data[index]['predicted_close'].toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        )
    } else {
        <div>Error</div>
    }
}
