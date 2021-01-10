import asyncHandler from 'express-async-handler'
import sql_db from '../config/sql_db.js'
import Movie from '../models/movieModel.js'

//@desc Fetch all movies
//@route GET /api/admin/movies
//@access public
const getAllMovies = asyncHandler(async (req, res) => {
  sql_db.query('SELECT * FROM movies', (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Unexpected error' })
    } else {
      res.json(result)
    }
  })
})

//@desc Add a movie
//@route POST /api/admin/movies
//@access public
const addMovie = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    year,
    runtime,
    genres,
    released,
    director,
    writer,
    cast,
    desc,
    isAdult,
  } = req.body

  sql_db.query(
    'SELECT * FROM movies WHERE name = ? AND YEAR = ?',
    [name, year],
    (err, result) => {
      if (result.length > 0) {
        res.status(400)
        throw new Error('Movie already exists')
      }
    }
  )

  let ref

  sql_db.query(
    'INSERT INTO movies (name, year) VALUES (?, ?)',
    [name, year],
    (err, result) => {
      if (err) {
        res.status(500)
        throw new Error('Insert failed')
      } else {
        ref = result.insertId

        const addToMongo = async () => {
          const movie = await Movie.create({
            refId: Number(ref),
            name,
            image,
            year,
            runtime,
            genres,
            released,
            director,
            writer,
            cast,
            desc,
            isAdult,
          })
          if (movie) {
            res.json(movie)
          } else {
            res.status(500)
            throw new Error('Creation failed')
          }
        }

        addToMongo()
      }
    }
  )
})

//@desc Fetch all movies
//@route GET /api/admin/current/movies
//@access public
const getCurrentMovies = asyncHandler(async (req, res) => {
  const isScreening = 1
  sql_db.query(
    'SELECT * FROM movies WHERE isScreening = ?',
    [isScreening],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Unexpected error' })
      } else {
        res.json(result)
      }
    }
  )
})

//@desc Fetch all movies
//@route GET /api/admin/past/movies
//@access public
const getPastMovies = asyncHandler(async (req, res) => {
  const isScreening = 0
  sql_db.query(
    'SELECT * FROM movies WHERE isScreening = ?',
    [isScreening],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Unexpected error' })
      } else {
        res.json(result)
      }
    }
  )
})

//@desc Update running costs
//@route PUT /api/admin/movies/:id
//@access public
const updateAmountSpent = asyncHandler(async (req, res) => {
  const { costs } = req.body
  sql_db.query(
    'UPDATE movies SET spent = spent + ? WHERE id = ?',
    [costs, req.params.id],
    (err, result) => {
      if (err) {
        console.error(err)
      } else {
        console.log(result)
        res.json(result)
      }
    }
  )
})

//@desc Set screening status
//@route PUT /api/admin/screen/:id
//@access public
const setScreening = asyncHandler(async (req, res) => {
  const { isScreening } = req.body

  const movie = await Movie.findOne({ refId: req.params.id })

  if (movie) {
    movie.isScreening = isScreening === 1 ? true : false
    const updatedMovie = await movie.save()

    if (isScreening === 0) {
      sql_db.query(
        'UPDATE movies SET projected = earned WHERE id = ?',
        [req.params.id],
        (err, result) => {
          if (err) {
            console.error(err)
          }
        }
      )
    }

    sql_db.query(
      'UPDATE movies SET isScreening = ? WHERE id = ?',
      [isScreening, req.params.id],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )

    res.json(updatedMovie)
  } else {
    res.status(404)
    throw new Error('Movie not found...')
  }
})

export {
  getAllMovies,
  getCurrentMovies,
  getPastMovies,
  updateAmountSpent,
  setScreening,
  addMovie,
}
