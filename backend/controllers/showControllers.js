import asyncHandler from 'express-async-handler'
import Show from '../models/showModel.js'
import Movie from '../models/movieModel.js'
import sql_db from '../config/sql_db.js'

//@desc Fetch all shows
//@route GET /api/shows
//@access public
const listAllShows = asyncHandler(async (req, res) => {
  const shows = await Show.find({})
  res.json(shows)
})

//@desc Fetch future shows
//@route GET /api/shows/future
//@access public
const listFutureShows = asyncHandler(async (req, res) => {
  const futureShows = await Show.find({ done: false })
  res.json(futureShows)
})

//@desc Fetch past shows
//@route GET /api/shows/past
//@access public
const listPastShows = asyncHandler(async (req, res) => {
  const pastShows = await Show.find({ done: true })
  res.json(pastShows)
})

//@desc Mark show as done
//@route PUT /api/shows/mark/:id
//@access public
const markShow = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id)

  if (show) {
    const id = show.movie.refId
    const mov = await Movie.findOne({ refId: id })

    mov.showCount = mov.showCount - 1
    const updatedMov = await mov.save()

    sql_db.query(
      'UPDATE movies SET showsScreened = showsScreened + 1, showsScheduled = showsScheduled - 1 WHERE id = ?',
      [id],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )
    show.done = true
    const markedShow = await show.save()
    res.json(markedShow)
  } else {
    res.status(404)
    throw new Error('Not found...')
  }
})

//@desc Fetch show details
//@route GET /api/shows/:id
//@access public
const listShowDetails = asyncHandler(async (req, res) => {
  const show = await Show.findById(req.params.id)
  if (show) {
    res.json(show)
  } else {
    res.status(404)
    throw new Error('Show not found')
  }
})

//@desc Update show details
//@route PUT /api/shows/:id
//@access public
const updateShowDetails = asyncHandler(async (req, res) => {
  const { tickets, price } = req.body

  const show = await Show.findById(req.params.id)
  if (show) {
    show.ticketCount = tickets
    show.ticketPrice = price

    const updatedShow = await show.save()
    res.json(updatedShow)
  } else {
    res.status(404)
    throw new Error('Show not found')
  }
})

//@desc Create a show
//@route POST /api/shows
//@access public
const createShow = asyncHandler(async (req, res) => {
  const { movie, date, ticketCount, ticketPrice } = req.body

  const showMovie = await Movie.findOne({ refId: movie.refId })

  showMovie.showCount = showMovie.showCount + 1
  const updatedShowMovie = await showMovie.save()

  sql_db.query(
    'UPDATE movies SET showsScheduled = showsScheduled + 1 WHERE id = ?',
    [movie.refId],
    (err, result) => {
      if (err) {
        console.err(error)
      } else {
        console.log(result)
      }
    }
  )

  const show = await Show.create({
    movie,
    date,
    ticketCount,
    ticketPrice,
  })

  if (show) {
    res.json(show)
  } else {
    res.status(200)
    throw new Error('Creation failed...')
  }
})

//@desc Get current movies
//@route GET /api/shows/movies
//@access public
const getCurrentMovies = asyncHandler(async (req, res) => {
  const currentMovies = await Movie.find({ isScreening: true })
  res.json(currentMovies)
})

export {
  listAllShows,
  listFutureShows,
  listPastShows,
  markShow,
  listShowDetails,
  updateShowDetails,
  createShow,
  getCurrentMovies,
}
