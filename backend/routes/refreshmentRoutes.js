import express from 'express'
import {
  getRefreshments,
  updateRefreshment,
  addRefreshment,
  getRefreshmentById,
  deleteRefreshment,
} from '../controllers/refreshmentControllers.js'

const router = express.Router()

router
  .route('/')
  .get(getRefreshments)
  .post(addRefreshment)

router
  .route('/:id')
  .get(getRefreshmentById)
  .put(updateRefreshment)
  .delete(deleteRefreshment)

export default router
