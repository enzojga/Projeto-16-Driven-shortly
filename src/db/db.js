import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

export default function psql(){

    try{
        const conn = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
    return conn;

    }catch (err){

        console.log(err);
        return err;
    }
}
