import mongoose from 'mongoose'
import dotenv from 'dotenv'
import users from './data/users.js'
import movies from './data/movies.js'
import User from './models/userModel.js'
import Ticket from './models/ticketModel.js'
import Show from './models/showModel.js'
import Refreshment from './models/refreshmentModel.js'
import Movie from './models/movieModel.js'
import Employee from './models/employeeModel.js'
import connectDB from './config/nosql_db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await User.deleteMany()
    await Ticket.deleteMany()
    await Show.deleteMany()
    await Refreshment.deleteMany()
    await Movie.deleteMany()
    await Employee.deleteMany()

    await User.insertMany(users)
    await Movie.insertMany(movies)

    console.log('Data imported...')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await Ticket.deleteMany()
    await Show.deleteMany()
    await Refreshment.deleteMany()
    await Movie.deleteMany()
    await Employee.deleteMany()

    console.log('Data destroyed...')
    process.exit()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
