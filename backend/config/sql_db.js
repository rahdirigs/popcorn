import mysql from 'mysql'
import dotenv from 'dotenv'

dotenv.config()

const sql_db = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DBNAME,
})

sql_db.connect(err => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log('MySQL database connected')
  }
})

export default sql_db
