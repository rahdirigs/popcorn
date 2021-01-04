import express from 'express'
import {
  addMovie,
  getAllMovies,
  getCurrentMovies,
  getPastMovies,
  setScreening,
  updateAmountSpent,
} from '../controllers/adminControllers.js'

const router = express.Router()

router
  .route('/movies')
  .get(getAllMovies)
  .post(addMovie)
router.route('/movies/:id').put(updateAmountSpent)
router.route('/screen/:id').put(setScreening)
router.route('/current/movies').get(getCurrentMovies)
router.route('/past/movies').get(getPastMovies)

export default router
