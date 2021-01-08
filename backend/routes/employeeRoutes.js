import express from 'express'
import {
  getAllEmployees,
  getCurrentEmployees,
  getPastEmployees,
  registerEmployee,
  toggleWorkingStatus,
  getCurrentEmployeesFromMongo,
} from '../controllers/employeeControllers.js'

const router = express.Router()

router
  .route('/')
  .get(getAllEmployees)
  .post(registerEmployee)
router.route('/work/:id').put(toggleWorkingStatus)
router.route('/current').get(getCurrentEmployees)
router.route('/past').get(getPastEmployees)
router.route('/mongo/current').get(getCurrentEmployeesFromMongo)

export default router
