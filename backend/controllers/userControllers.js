import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import sql_db from '../config/sql_db.js'
import generateToken from '../utils/generateToken.js'

//@desc Auth users and get token
//@route POST /api/users/login
//@access public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      contact: user.contact,
      genres: user.genres,
      watched: user.watched,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

//@desc Register a new user
//@route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    contact,
    genres,
    addressLineOne,
    addressLineTwo,
    city,
    pincode,
  } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    dateOfBirth,
    password,
    contact,
    genres,
    addressLineOne,
    addressLineTwo,
    city,
    pincode,
  })

  const {
    err,
    result,
  } = sql_db.query(
    'INSERT INTO users (firstName, lastName, email, password, contact, addressLineOne, addressLineTwo, city, pincode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      firstName,
      lastName,
      email,
      password,
      contact,
      addressLineOne,
      addressLineTwo,
      city,
      pincode,
    ]
  )

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      contact: user.contact,
      genres: user.genres,
      watched: user.watched,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

//@desc Get user profile
//@route GET /api/users/profile
//@access public
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      contact: user.contact,
      genres: user.genres,
      watched: user.watched,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile, registerUser }
