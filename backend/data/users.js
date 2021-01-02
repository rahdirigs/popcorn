import bcrypt from 'bcryptjs'

const users = [
  {
    firstName: 'Giridhar',
    lastName: 'Shanbhag',
    email: 'user1@gmail.com',
    dateOfBirth: '2000-02-22',
    password: bcrypt.hashSync('123456', 10),
    contact: '7411858583',
    genres: ['Mystery', 'Thriller', 'Action'],
    addressLineOne: 'abc',
    addressLineTwo: 'xyz',
    city: 'Bangalore',
    pincode: '560069',
  },
]

export default users
