import React, { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Registerpage = ({ location, history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [initialDate, setInitialDate] = useState(new Date())
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contact, setContact] = useState('')
  const [genres, setGenres] = useState([])
  const [values, setValues] = useState([])
  const [addressLineOne, setAddressLineOne] = useState('')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [message, setMessage] = useState(null)

  const options = [
    { id: 1, text: 'Action', value: 'Action' },
    { id: 2, text: 'Adventure', value: 'Adventure' },
    { id: 3, text: 'Comedy', value: 'Comedy' },
    { id: 4, text: 'Crime', value: 'Crime' },
    { id: 5, text: 'Drama', value: 'Drama' },
    { id: 6, text: 'Fantasy', value: 'Fantasy' },
    { id: 7, text: 'Historical', value: 'Historical' },
    { id: 8, text: 'Horror', value: 'Horror' },
    { id: 9, text: 'Magical', value: 'Magical' },
    { id: 10, text: 'Mystery', value: 'Mystery' },
    { id: 11, text: 'Paranoid Fiction', value: 'Paranoid Fiction' },
    { id: 12, text: 'Philosophical', value: 'Philosophical' },
    { id: 13, text: 'Political', value: 'Political' },
    { id: 14, text: 'Romance', value: 'Romance' },
    { id: 15, text: 'Saga', value: 'Saga' },
    { id: 16, text: 'Satire', value: 'Satire' },
    { id: 17, text: 'Science Fiction', value: 'Science Fiction' },
    { id: 18, text: 'Social', value: 'Social' },
    { id: 19, text: 'Speculative', value: 'Speculative' },
    { id: 20, text: 'Thriller', value: 'Thriller' },
    { id: 21, text: 'Urban', value: 'Urban' },
    { id: 22, text: 'Western', value: 'Western' },
  ]

  const dispatch = useDispatch()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegister

  useEffect(() => {
    if (userInfo.firstName) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const isFormEmpty = () => {
    return (
      !firstName.length ||
      !password.length ||
      !email.length ||
      !confirmPassword.length ||
      !contact.length ||
      !addressLineOne.length ||
      !city.length ||
      !pincode.length
    )
  }

  const isPasswordValid = () => {
    if (password.length < 6) {
      setMessage('Insufficient password length')
      return false
    } else if (password !== confirmPassword) {
      setMessage("Passwords don't match")
      return false
    } else {
      return true
    }
  }

  const isContactValid = () => {
    if (contact.length !== 10) {
      return false
    }
    for (let i = 0; i < contact.length; i++) {
      if (contact[i] >= '0' && contact[i] <= '9') {
        continue
      } else {
        return false
      }
    }
    return true
  }

  const isDateOfBirthValid = () => {
    const today = new Date()
    if (today.getFullYear() < initialDate.getFullYear()) {
      return false
    } else if (today.getFullYear() > initialDate.getFullYear()) {
      return true
    } else {
      if (today.getMonth() < initialDate.getMonth()) {
        return false
      } else if (today.getMonth() > initialDate.getMonth()) {
        return true
      } else {
        if (today.getDate() < initialDate.getDate()) {
          return false
        } else {
          return true
        }
      }
    }
  }

  const isFormValid = () => {
    if (isFormEmpty()) {
      setMessage('Please fill out all fields')
      return false
    } else if (!isPasswordValid()) {
      return false
    } else if (!isContactValid()) {
      setMessage('Please enter a valid contact number')
      return false
    } else if (!isDateOfBirthValid()) {
      setMessage('Please enter a valid date of birth')
      return false
    } else {
      return true
    }
  }

  const getFormattedDate = date => {
    const d = new Date(date)
    let month = '' + (d.getMonth() + 1)
    let day = '' + d.getDate()
    let year = d.getFullYear()
    if (month.length < 2) {
      month = '0' + month
    }
    if (day.length < 2) {
      day = '0' + day
    }
    return [year, month, day].join('-')
  }

  const submitHandler = e => {
    e.preventDefault()

    if (isFormValid()) {
      const dateOfBirth = getFormattedDate(initialDate)
      dispatch(
        register(
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
          pincode
        )
      )
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <br />
          <DatePicker
            selected={initialDate}
            onChange={date => setInitialDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm your Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your contact number"
            value={contact}
            onChange={e => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Select your preferred genres</Form.Label>
          <Form.Control
            as="select"
            multiple
            value={values}
            onChange={e => {
              const value = e.target.value
              const index = values.indexOf(value)
              if (index > -1) {
                values.splice(index, 1)
              } else {
                values.push(value)
              }
              setGenres(values)
            }}
          >
            {options.map(option => (
              <option key={option.id}>{option.text}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="addressLineOne">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={addressLineOne}
            onChange={e => setAddressLineOne(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="addressLineTwo">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={addressLineTwo}
            onChange={e => setAddressLineTwo(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="pincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          Existing customer?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default Registerpage
