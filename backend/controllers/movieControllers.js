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

//@desc Create a new review
//@route POST /api/movies/:id/reviews
//@access private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const movie = await Movie.findOne({ refId: req.params.id })

  if (movie) {
    const reviewed = movie.reviews.filter(
      r => r.user.toString() === req.user._id.toString()
    )

    console.log(reviewed)

    if (reviewed.length > 0) {
      res.status(201).json({ message: 'Already reviewed' })
    } else {
      const review = {
        user: req.user._id,
        name: [req.user.firstName, req.user.lastName].join(' '),
        rating: Number(rating),
        comment: comment,
      }

      console.log(review)
      movie.reviews.push(review)
      movie.numReviews = movie.reviews.length
      movie.ratings =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.numReviews

      await movie.save()
      res.status(201).json({ message: 'Review added' })
    }
  } else {
    throw new Error('Movie not found')
  }
})

//@desc Get recommendation
//@route GET /api/movies/recommended
//@access private
const getRecommended = asyncHandler(async (req, res) => {
  const allMovies = await Movie.find({ isScreening: true })

  allMovies.sort((a, b) => (a.ratings > b.ratings ? 1 : 0))

  if (allMovies.length >= 5) {
    res.json(allMovies.slice(0, 5))
  } else {
    res.json(allMovies)
  }
})

export { getMovies, getMovieById, createReview, getRecommended }
