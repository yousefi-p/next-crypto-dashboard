'use client'
// app/page.tsx
import CryptoTable from '@/components/CryptoTable'
import PredictionChart from '@/components/PredictionChart'
import ForecastTable from '@/components/ForecastTable'
import { useState } from 'react'

export default function Home() {
  const [currency, setCurrency] = useState({ name: 'btc', symbol: 'BTC' })



  return (

    <div className="container mt-5">
      <div className="row">
        <nav className='nav'>
          <div className='px-1'>
            <button type="button" className="btn btn-primary" onClick={() => setCurrency({ name: 'btc', symbol: 'BTC' })}>BTC</button>
          </div>
          <div className='px-1'>
            <button type="button" className="btn btn-primary" onClick={() => setCurrency({ name: 'eth', symbol: 'ETH' })}>ETH</button>
          </div>
          <div className='px-1'>
            <button type="button" className="btn btn-primary" onClick={() => setCurrency({ name: 'trx', symbol: 'TRX' })}>TRX</button>
          </div>
          <div className='px-1'>
            <button type="button" className="btn btn-primary" onClick={() => setCurrency({ name: 'doge', symbol: 'DOGE' })}>DOGE</button>
          </div>
          <div className='px-1'>
            <button type="button" className="btn btn-primary" onClick={() => setCurrency({ name: 'xrp', symbol: 'XRP' })}>XRP</button>
          </div>
          <div className='px-1'>
            <button type="button" className="btn btn-primary" onClick={() => setCurrency({ name: 'sol', symbol: 'SOL' })}>SOL</button>
          </div>

        </nav>
      </div>
      <h2 className='mb-4'>Model Prediction of {currency.symbol}</h2>
      <ForecastTable name={currency.name} symbol={currency.symbol} />
      <h2 className="mb-4">Prediction vs Real Data Chart of {currency.symbol}</h2>
      <PredictionChart name={currency.name} symbol={currency.symbol} />
      <h1 className="mb-4">Crypto Data and Predictions</h1>
      <CryptoTable name={currency.symbol} symbol={currency.symbol} />
    </div>
  )
}
