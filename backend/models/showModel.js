import mongoose from 'mongoose'

const showSchema = mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Movie',
    },
    date: String,
    ticketCount: Number,
    ticketSold: {
      type: Number,
      default: 0,
    },
    earned: {
      type: Number,
      default: 0,
    },
    ticketPrice: Number,
    done: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Show = mongoose.model('Show', showSchema)

export default Show
