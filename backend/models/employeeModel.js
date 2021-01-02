import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: String,
    rating: Number,
    comment: String,
  },
  {
    timestamps: true,
  }
)

const employeeSchema = mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    dateOfBirth: String,
    password: String,
    contact: String,
    addressLineOne: String,
    addressLineTwo: String,
    city: String,
    pincode: String,
    reviews: [reviewSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
