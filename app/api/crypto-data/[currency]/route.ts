// app/api/crypto-data/route.ts
import { NextResponse } from 'next/server';
import { Client } from 'pg';




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
      FROM ${currency}_usdt_1d_data d
      JOIN ${currency}_1d_predictions p ON d.date = p.date
      ORDER BY d.date DESC
      LIMIT 50
    `
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
