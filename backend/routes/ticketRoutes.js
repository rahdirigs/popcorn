import express from 'express'
import { bookTicket } from '../controllers/ticketControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, bookTicket)

export default router
