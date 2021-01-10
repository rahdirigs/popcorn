import asyncHandler from 'express-async-handler'
import moment from 'moment'
import sql_db from '../config/sql_db.js'
import Employee from '../models/employeeModel.js'
import Ticket from '../models/ticketModel.js'

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

//@desc Fetch current employees from MongoDB
//@route GET /api/employees/mongo/current
//@access public
const getCurrentEmployeesFromMongo = asyncHandler(async (req, res) => {
  const currentEmployees = await Employee.find({ isWorking: true })
  res.json(currentEmployees)
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
  const { isWorking } = req.body

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

//@desc Trace contact
//@route GET /api/employees/infected/:id
//@access public
const traceInfections = asyncHandler(async (req, res) => {
  const employee = await Employee.findOne({ refId: req.params.id })
  const today = moment()
  const lower = moment().subtract(28, 'days')

  if (employee) {
    const allTickets = await Ticket.find({})
    let users = []

    allTickets.map(ticket => {
      if (ticket.employee) {
        if (
          ticket.employee.refId === employee.refId &&
          moment(ticket.show.date).isBetween(lower, today)
        ) {
          users.push(ticket.user)
        }
      }
    })

    let finalUsers = [],
      userEmails = []
    users.map(user => {
      if (!userEmails.includes(user.email)) {
        finalUsers.push(user)
        userEmails.push(user.email)
      }
    })

    res.json(finalUsers)
  } else {
    res.status(404)
    throw new Error('Employee not found!!!')
  }
})

export {
  getAllEmployees,
  getCurrentEmployees,
  getPastEmployees,
  toggleWorkingStatus,
  registerEmployee,
  getCurrentEmployeesFromMongo,
  traceInfections,
}
