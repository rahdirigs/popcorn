import express from 'express'
import {
  authUser,
  getRecommendation,
  getUserProfile,
  getWatchList,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/watched').get(protect, getWatchList)
router.route('/recommended').get(protect, getRecommendation)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
