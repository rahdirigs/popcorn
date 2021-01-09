import express from 'express'
import {
  createReview,
  getMovieById,
  getMovies,
} from '../controllers/movieControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getMovies)
router.route('/:id/reviews').post(protect, createReview)

router.route('/:id').get(getMovieById)

export default router
