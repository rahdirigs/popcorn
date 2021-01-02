import express from 'express'
import asyncHandler from 'express-async-handler'
import Movie from '../models/movieModel.js'

const router = express.Router()

//@desc Fetch all movies
//@route GET /api/movies
//@access public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const movies = await Movie.find({})

    res.json(movies)
  })
)

//@desc Fetch movie by refId
//@route GET /api/movies/:id
//@access public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const movie = await Movie.findOne({ refId: req.params.id })

    if (movie) {
      res.json(movie)
    } else {
      res.status(404)
      throw new Error('Movie not found')
    }
  })
)

export default router
