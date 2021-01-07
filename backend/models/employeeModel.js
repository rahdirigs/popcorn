import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types,
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
    refId: {
      type: Number,
      required: true,
    },
    firstName: String,
    lastName: String,
    email: {
      type: String,
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
    isWorking: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Employee = mongoose.model('Employee', employeeSchema)

export default Employee
