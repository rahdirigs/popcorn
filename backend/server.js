import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/nosql_db.js'
import movieRoutes from './routes/movieRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use('/api/movies', movieRoutes)

app.get('/api/movies/:id')

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
