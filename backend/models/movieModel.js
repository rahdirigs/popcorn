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

const movieSchema = mongoose.Schema(
  {
    refId: Number,
    name: String,
    image: String,
    year: String,
    runtime: Number,
    genres: [],
    released: String,
    director: String,
    writer: [],
    cast: [],
    desc: String,
    reviews: [reviewSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isAdult: {
      type: Boolean,
      default: false,
    },
    isScreening: {
      type: Boolean,
      default: true,
    },
    showCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
