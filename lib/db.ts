import { Pool } from "pg";
import { env } from "process";


const pool = new Pool({
    host: env.DATABASE_HOST,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    database: env.DATABASE_NAME,
});

export default pool;