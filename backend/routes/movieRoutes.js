import express from 'express'
import { getMovieById, getMovies } from '../controllers/movieControllers.js'

const router = express.Router()

router.route('/').get(getMovies)

router.route('/:id').get(getMovieById)

export default router
