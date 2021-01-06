import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Button, Form } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import { registerEmployee } from '../actions/employeeActions'
import { useDispatch, useSelector } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import moment from 'moment'

const EmployeeAddPage = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [initialDate, setInitialDate] = useState(new Date())
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contact, setContact] = useState('')
  const [addressLineOne, setAddressLineOne] = useState('')
  const [addressLineTwo, setAddressLineTwo] = useState('')
  const [city, setCity] = useState('')
  const [pincode, setPincode] = useState('')
  const [message, setMessage] = useState(null)
  const [success, setSuccess] = useState(false)

  const dispatch = useDispatch()

  const employeeAdd = useSelector(state => state.employeeAdd)
  const { loading, error } = employeeAdd

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
    let date_1 = moment([
      initialDate.getFullYear(),
      initialDate.getMonth() + 1,
      initialDate.getDate(),
    ])
    let date_2 = moment([
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate(),
    ])
    let dif = date_2.diff(date_1, 'years', true)
    if (dif < 18) {
      setMessage('The aapplicant is a minor and cannot be employed...')
      return false
    }
    if (today.getFullYear() < initialDate.getFullYear()) {
      setMessage('Please enter a valid date of birth')
      return false
    } else if (today.getFullYear() > initialDate.getFullYear()) {
      return true
    } else {
      if (today.getMonth() < initialDate.getMonth()) {
        setMessage('Please enter a valid date of birth')
        return false
      } else if (today.getMonth() > initialDate.getMonth()) {
        return true
      } else {
        if (today.getDate() < initialDate.getDate()) {
          setMessage('Please enter a valid date of birth')
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
      setMessage(null)
      const dateOfBirth = getFormattedDate(initialDate)
      dispatch(
        registerEmployee(
          firstName,
          lastName,
          email,
          dateOfBirth,
          password,
          contact,
          addressLineOne,
          addressLineTwo,
          city,
          pincode
        )
      )
      setSuccess(true)
    }
  }

  return (
    <FormContainer>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
      {success && (
        <Message variant="success">Successfully registered employee</Message>
      )}
      <h3>Register employee</h3>
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the last name"
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
            placeholder="Enter the password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm the password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="contact">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the contact number"
            value={contact}
            onChange={e => setContact(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="addressLineOne">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the address"
            value={addressLineOne}
            onChange={e => setAddressLineOne(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="addressLineTwo">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the address"
            value={addressLineTwo}
            onChange={e => setAddressLineTwo(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the city"
            value={city}
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="pincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the address"
            value={pincode}
            onChange={e => setPincode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>
      </Form>
    </FormContainer>
  )
}

export default EmployeeAddPage
