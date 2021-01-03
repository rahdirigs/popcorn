import asyncHandler from 'express-async-handler'
import Movie from '../models/movieModel.js'
import sql_db from '../config/sql_db.js'

//@desc Fetch all movies
//@route GET /api/movies
//@access public
const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find({})

  res.json(movies)
})

//@desc Fetch movie by refId
//@route GET /api/movies/:id
//@access public
const getMovieById = asyncHandler(async (req, res) => {
  const movie = await Movie.findOne({ refId: req.params.id })

  if (movie) {
    res.json(movie)
  } else {
    res.status(404)
    throw new Error('Movie not found')
  }
})

export { getMovies, getMovieById }
