import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const Profilepage = ({ history }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.firstName || !user || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET })
        dispatch(getUserDetails())
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setContact(user.contact)
        setDateOfBirth(user.dateOfBirth)
      }
    }
  }, [history, user, userInfo, dispatch, success])

  const isPasswordValid = () => {
    if (password.length === 0 && confirmPassword.length === 0) {
      return true
    }
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

  const isFormValid = () => {
    if (!isPasswordValid()) {
      return false
    } else if (!isContactValid()) {
      setMessage('Please enter a valid contact number')
      return false
    } else {
      return true
    }
  }

  const submitHandler = e => {
    e.preventDefault()

    if (isFormValid()) {
      dispatch(
        updateUserProfile({
          email: user.email,
          password: password.length > 0 ? password : user.password,
          contact: contact,
        })
      )
    }
  }

  return (
    <FormContainer>
      <h1>User Profile</h1>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
      {success && (
        <Message variant="success">Succesfully updated profile...</Message>
      )}
      <Form onSubmit={submitHandler}>
        <Form.Row>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              readOnly
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              readOnly
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
            readOnly
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Date of Birth"
            value={dateOfBirth}
            onChange={e => setDateOfBirth(e.target.value)}
            readOnly
          ></Form.Control>
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
        <Button type="submit" variant="primary">
          Update Profile
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Profilepage
