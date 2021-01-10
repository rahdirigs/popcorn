import express from 'express'
import {
  createReview,
  getMovieById,
  getMovies,
  getRecommended,
} from '../controllers/movieControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getMovies)
router.route('/recommended').get(getRecommended)
router.route('/:id/reviews').post(protect, createReview)

router.route('/:id').get(getMovieById)

export default router
