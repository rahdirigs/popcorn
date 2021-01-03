import axios from 'axios'
import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import Message from '../../components/Message'
import { projectStorage } from '../../firebase'

const Addrefreshmentpage = ({ history }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [countInStock, setCountInStock] = useState(0)
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)

  const types = ['image/png', 'image/jpeg']

  const isFormvalid = () => {
    if (name.length === 0) {
      setMessage('Enter a valid name')
      return false
    } else if (price === 0) {
      setMessage('Enter a valid price')
      return false
    } else if (countInStock === 0) {
      setMessage('Count In Stock must be non zero')
      return false
    } else if (!file) {
      return false
    } else {
      setMessage(null)
      return true
    }
  }

  const addRefreshment = async url => {
    const { data } = await axios.post('/api/refreshments', {
      name: name,
      image: url,
      countInStock: countInStock,
      price: price,
    })

    console.log(data.message)
  }

  const submitHandler = e => {
    e.preventDefault()

    if (isFormvalid()) {
      const ref = projectStorage.ref(file.name)

      ref.put(file).on(
        'state_changed',
        snap => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100
          setProgress(percentage)
          console.log(progress)
        },
        err => {
          setUploadError(err)
        },
        async () => {
          const url = await ref.getDownloadURL()
          console.log(url)
          addRefreshment(url)
        }
      )
      history.push('/refreshments')
    }
  }

  const handleUpload = e => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      setFile(selected)
      setError(null)
    } else {
      setFile(null)
      setError('Please select an image of .png or .jpeg format')
    }
  }

  return (
    <FormContainer>
      <h3>Add refreshment</h3>
      {message && <Message>{message}</Message>}
      <Form type="submit" onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Refreshment Name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter the refreshment name"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Refreshment Price</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Enter the refreshment cost per unit"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Count in Stock</Form.Label>
          <Form.Control
            type="text"
            value={countInStock}
            onChange={e => setCountInStock(e.target.value)}
            placeholder="Enter the refreshment units in stock"
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Pick refreshment Image</Form.Label>
          <Form.File id="fileUpload" onChange={handleUpload} />
        </Form.Group>
        {error && <Message>{error}</Message>}
        {uploadError && <Message>{uploadError}</Message>}

        <Button variant="primary" type="submit">
          Add Refreshment
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Addrefreshmentpage
