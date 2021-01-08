import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
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
    genres: [],
    addressLineOne: String,
    addressLineTwo: String,
    city: String,
    pincode: String,
    watched: [
      {
        show: {
          type: mongoose.Schema.Types,
          ref: 'Show',
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function(inputPassword) {
  return await bcrypt.compare(inputPassword, this.password)
}

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)

export default User
