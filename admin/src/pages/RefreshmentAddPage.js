import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, ProgressBar } from 'react-bootstrap'
import { addRefreshment } from '../actions/refreshmentActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { projectStorage } from '../firebase'

const RefreshmentAddPage = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const refreshmentAdd = useSelector(state => state.refreshmentAdd)
  const { loading, error, success } = refreshmentAdd

  const types = ['image/png', 'image/jpeg']

  const isFormValid = () => {
    if (!name.length) {
      setMessage('Please enter a valid name')
      return false
    } else if (price === 0 || countInStock === 0) {
      setMessage('The price or units in stock should be non-zero')
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    if (success) {
      history.push('/refreshments')
    }
  }, [success, history])

  const submitHandler = e => {
    e.preventDefault()

    if (file && isFormValid()) {
      setMessage(null)
      const storageRef = projectStorage.ref(file.name)
      storageRef.put(file).on(
        'state_changed',
        snap => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(percentage)
        },
        err => {
          setUploadError(err)
        },
        async () => {
          const url = await storageRef.getDownloadURL()
          dispatch(addRefreshment(name, url, price, countInStock))
        }
      )
    }
  }

  const handleFileUpload = e => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setMessage(null)
    } else {
      setFile(null)
      setMessage('Please select an image of .png or .jpeg format')
    }
  }

  return (
    <FormContainer>
      <h3>Add refreshment</h3>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {message && <Message>{message}</Message>}
      {uploadError && <Message>Error uploading image to database</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Refreshment Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter the refreshment name"
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Price per unit</Form.Label>
          <Form.Control
            type="number"
            value={price}
            placeholder="Enter the refreshment price"
            onChange={e => setPrice(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Count in Stock</Form.Label>
          <Form.Control
            type="number"
            value={countInStock}
            placeholder="Enter the refreshment units in stock"
            onChange={e => setCountInStock(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Sample Image</Form.Label>
          <Form.File onChange={handleFileUpload}></Form.File>
        </Form.Group>
        <ProgressBar variant="success" now={progress} />
        <Button type="submit" variant="primary" className="my-3">
          Add Refreshment
        </Button>
      </Form>
      {success && <Message variant="success">Successfully added item</Message>}
    </FormContainer>
  )
}

export default RefreshmentAddPage
