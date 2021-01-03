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

  if (user) {
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
//@access private
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

//@desc Update user profile
//@route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.contact = req.body.contact || user.contact
    let sqlpassword
    if (req.body.password) {
      user.password = req.body.password
      sqlpassword = req.body.password
    } else {
      sql_db.query(
        'SELECT password from users WHERE email = ?',
        [user.email],
        (err, result) => {
          sqlpassword = result[0].password
        }
      )
    }
    const updatedUser = await user.save()

    sql_db.query(
      'UPDATE users SET password = (?), contact = (?) WHERE email = ?',
      [sqlpassword, updatedUser.contact, updatedUser.email],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      dateOfBirth: updatedUser.dateOfBirth,
      contact: updatedUser.contact,
      genres: updatedUser.genres,
      watched: updatedUser.watched,
      token: generateToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
