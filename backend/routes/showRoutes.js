import express from 'express'
import {
  createShow,
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
router
  .route('/:id')
  .put(updateShowDetails)
  .get(listShowDetails)
router.route('/future').get(listFutureShows)
router.route('/past').get(listPastShows)
router.route('/mark/:id').put(markShow)

export default router
