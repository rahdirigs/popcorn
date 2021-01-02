import mongoose from 'mongoose'

const refreshmentSchema = mongoose.Schema(
  {
    name: String,
    price: Number,
    countInStock: Number,
  },
  {
    timestamps: true,
  }
)

const Refreshment = mongoose.model('Refreshment', refreshmentSchema)

export default Refreshment
