import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/nosql_db.js'
import sql_db from './config/sql_db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import movieRoutes from './routes/movieRoutes.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/movies', movieRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('API is running...')
  sql_db.query('SHOW TABLES', (err, result) => {
    if (err) {
      console.error(err)
    } else {
      console.log(result)
    }
  })
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
