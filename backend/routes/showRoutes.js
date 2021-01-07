import express from 'express'
import {
  createShow,
  getCurrentMovies,
  listAllShows,
  listFutureShows,
  listPastShows,
  listShowDetails,
  markShow,
  updateShowDetails,
} from '../controllers/showControllers.js'

const router = express.Router()

router
  .route('/')
  .get(listAllShows)
  .post(createShow)
router.route('/movies').get(getCurrentMovies)
router.route('/future').get(listFutureShows)
router.route('/past').get(listPastShows)
router.route('/mark/:id').put(markShow)
router
  .route('/:id')
  .put(updateShowDetails)
  .get(listShowDetails)

export default router
