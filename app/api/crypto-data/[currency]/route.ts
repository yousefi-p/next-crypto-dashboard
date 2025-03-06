// app/api/crypto-data/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { Client } from 'pg';

interface Currency {
  currency: string
}


export async function GET(request: Request) {
  const data = await request.url;
  const currency = data.split('crypto-data/')[1].trim().toString();
  console.log(currency)
  if (currency) {

    // Connect using the DATABASE_URL from your environment variables
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    })

    await client.connect()

    try {
      // Join the data table with the predictions table on date
      const query = `
      SELECT d.date, d.close, d.volume, p.prediction 
      FROM ${currency}_usdt_data d
      JOIN ${currency}_predictions p ON d.date = p.date
      ORDER BY d.date DESC
      LIMIT 100
    `
      console.log(query)
      const res = await client.query(query)
      await client.end()
      return NextResponse.json(res.rows)
    } catch (error) {
      console.error('Database error:', error)
      await client.end()
      return NextResponse.error()
    }
  }
}
