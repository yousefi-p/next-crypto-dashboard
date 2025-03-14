import { NextResponse } from 'next/server';
import { Client } from 'pg';




export async function GET(request: Request) {
    const data = await request.url;
    const currency = data.split('prediction/')[1].trim().toString();
    console.log(currency)
    if (currency) {

        // Connect using the DATABASE_URL from your environment variables
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
        })

        await client.connect()

        try {
            // Join the data table with the predictions table on date
            const query =
                `SELECT d.date, d.predicted_signal, p.predicted_close 
      FROM ${currency}_1d_forecast d
      JOIN ${currency}_rnn_hourly_predictions p
      ON (d.date = p.date)
      ORDER BY d.date`
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
