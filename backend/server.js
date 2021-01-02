import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/nosql_db.js'
import movies from './data/movies.js'
import sql_db from './config/sql_db.js'

dotenv.config()

connectDB()

const app = express()

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

app.get('/api/movies', (req, res) => {
  res.json(movies)
})

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find(mov => mov.refId === req.params.id)
  res.json(movie)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)
