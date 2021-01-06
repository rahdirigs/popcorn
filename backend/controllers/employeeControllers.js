import asyncHandler from 'express-async-handler'
import sql_db from '../config/sql_db.js'
import Employee from '../models/employeeModel.js'

//@desc Fetch all employees
//@route GET /api/employees
//@access public
const getAllEmployees = asyncHandler(async (req, res) => {
  sql_db.query('SELECT * FROM employees', (err, result) => {
    if (err) {
      res.status(500)
      throw new Error('Unexpected error')
    } else {
      res.json(result)
    }
  })
})

//@desc Fetch current employees
//@route GET /api/employees/current
//@access public
const getCurrentEmployees = asyncHandler(async (req, res) => {
  const isWorking = 1
  sql_db.query(
    'SELECT * FROM employees WHERE isWorking = ?',
    [isWorking],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Unexpected error' })
      } else {
        res.json(result)
      }
    }
  )
})

//@desc Fetch past employees
//@route GET /api/employees/past
//@access public
const getPastEmployees = asyncHandler(async (req, res) => {
  const isWorking = 0
  sql_db.query(
    'SELECT * FROM employees WHERE isWorking = ?',
    [isWorking],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Unexpected error' })
      } else {
        res.json(result)
      }
    }
  )
})

//@desc Toggle employee working status
//@route PUT /api/employees/work/:id
//@access public
const toggleWorkingStatus = asyncHandler(async (req, res) => {
  const { isWorking } = req.body.isWorking

  const employee = await Employee.findOne({ refId: req.params.id })

  if (employee) {
    employee.isWorking = isWorking === 1 ? true : false
    const updatedEmployee = await employee.save()

    sql_db.query(
      'UPDATE employees SET isWorking = ? where id = ?',
      [isWorking, req.params.id],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )

    res.json(updatedEmployee)
  } else {
    res.status(404)
    throw new Error('Employee not found...')
  }
})

//@desc Register Employee
//@route POST /api/employees
//@access public
const registerEmployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    contact,
    addressLineOne,
    addressLineTwo,
    city,
    pincode,
  } = req.body

  let ref

  sql_db.query(
    'INSERT INTO employees (firstName, lastName, email, dateOfBirth, password, contact, addressLineOne, addressLineTwo, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      firstName,
      lastName,
      email,
      dateOfBirth,
      password,
      contact,
      addressLineOne,
      addressLineTwo,
      city,
      pincode,
    ],
    (err, result) => {
      if (err) {
        res.status(400)
        throw new Error('Registration failed...')
      } else {
        ref = result.insertId

        const addToMongo = async () => {
          const employee = await Employee.create({
            refId: Number(ref),
            firstName,
            lastName,
            email,
            dateOfBirth,
            password,
            contact,
            addressLineOne,
            addressLineTwo,
            city,
            pincode,
          })

          if (employee) {
            res.json(employee)
          } else {
            res.status(400)
            throw new Error('Registration failed... Mongo')
          }
        }

        addToMongo()
      }
    }
  )
})

export {
  getAllEmployees,
  getCurrentEmployees,
  getPastEmployees,
  toggleWorkingStatus,
  registerEmployee,
}
