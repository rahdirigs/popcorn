import express from 'express'
import { bookTicket, getBookings } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router
  .route('/')
  .post(protect, bookTicket)
  .get(protect, getBookings)

export default router
