import asyncHandler from 'express-async-handler'
import Show from '../models/showModel.js'

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

export {
  listAllShows,
  listFutureShows,
  listPastShows,
  markShow,
  listShowDetails,
  updateShowDetails,
  createShow,
}
