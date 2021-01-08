import express from 'express'
import { bookTicket } from '../controllers/ticketControllers.js'

const router = express.Router()

router.route('/').post(bookTicket)

export default router
