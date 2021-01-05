import React, { useState } from 'react'
import { Button, Form, ProgressBar } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { projectStorage } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { addMovie } from '../actions/movieActions'

const MovieAddPage = () => {
  const [file, setFile] = useState(null)
  const [progress, setProgress] = useState(0)
  const [uploadError, setUploadError] = useState(null)
  const [name, setName] = useState('')
  const [runtime, setRuntime] = useState(0)
  const [genres, setGenres] = useState([])
  const [values, setValues] = useState([])
  const [releaseDate, setReleaseDate] = useState(new Date())
  const [director, setDirector] = useState('')
  const [writers, setWriters] = useState('')
  const [actors, setActors] = useState('')
  const [desc, setDesc] = useState('')
  const [isAdult, setIsAdult] = useState(false)
  const [message, setMessage] = useState(null)

  const types = ['image/png', 'image/jpeg']

  const dispatch = useDispatch()
  const movieAdd = useSelector(state => state.movieAdd)
  const { loading, success, error } = movieAdd

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

  const isFormEmpty = () => {
    return (
      !name.length ||
      runtime === 0 ||
      !genres.length ||
      !director.length ||
      !writers.length ||
      !actors.length ||
      !desc.length
    )
  }

  const isValidReleaseDate = () => {
    const today = new Date()
    if (today.getFullYear() < releaseDate.getFullYear()) {
      return false
    } else if (today.getFullYear() > releaseDate.getFullYear()) {
      return true
    } else {
      if (today.getMonth() < releaseDate.getMonth()) {
        return false
      } else if (today.getMonth() > releaseDate.getMonth()) {
        return true
      } else {
        if (today.getDate() < releaseDate.getDate()) {
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
    } else if (!isValidReleaseDate()) {
      setMessage('Please enter an appropriate release date')
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

    if (isFormValid() && file) {
      setMessage(null)
      const released = getFormattedDate(releaseDate)
      const year = released.slice(0, 4)
      const cast = actors.split(',')
      const writer = writers.split(',')
      for (let i = 1; i < cast.length; i++) {
        cast[i] = cast[i].slice(1, cast[i].length)
      }
      for (let i = 1; i < writer.length; i++) {
        writer[i] = writer[i].slice(1, writer[i].length)
      }
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
          dispatch(
            addMovie(
              name,
              url,
              year,
              runtime,
              genres,
              released,
              director,
              isAdult,
              writer,
              cast,
              desc
            )
          )
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
      <h3>Add movie</h3>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {success && <Message variant="success">Successfully added movie</Message>}
      {message && <Message>{message}</Message>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Movie name</Form.Label>
          <Form.Control
            type="text"
            value={name}
            placeholder="Enter the movie name"
            onChange={e => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="runtime">
          <Form.Label>Movie Runtime</Form.Label>
          <Form.Control
            type="number"
            value={runtime}
            placeholder="Enter the movie runtime"
            onChange={e => setRuntime(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="released">
          <Form.Label>Release Date</Form.Label>
          <br />
          <DatePicker
            selected={releaseDate}
            onChange={date => setReleaseDate(date)}
          />
        </Form.Group>
        <Form.Group controlId="genres">
          <Form.Label>Select the movie genres</Form.Label>
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
        <Form.Group controlId="directors">
          <Form.Label>Movie Director(s)</Form.Label>
          <Form.Control
            type="text"
            value={director}
            placeholder="Enter the director name"
            onChange={e => setDirector(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="writers">
          <Form.Label>Movie Writer(s)</Form.Label>
          <Form.Control
            type="text"
            value={writers}
            placeholder="Enter the writer(s) name/names"
            onChange={e => setWriters(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="actors">
          <Form.Label>Movie Cast</Form.Label>
          <Form.Control
            type="text"
            value={actors}
            placeholder="Enter the actor(s) name/names"
            onChange={e => setActors(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="desc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Enter the movie description"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="isAdult">
          <Form.Label>Is movie Adult rated? </Form.Label>
          <Form.Check
            type="checkbox"
            label="Yes"
            checked={isAdult}
            onChange={e => setIsAdult(e.target.checked)}
          ></Form.Check>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Sample Poster</Form.Label>
          <Form.File onChange={handleFileUpload}></Form.File>
        </Form.Group>
        <ProgressBar variant="success" now={progress}></ProgressBar>
        {uploadError && <Message>Error uploading poster to firebase</Message>}
        <Button type="submit" variant="primary" className="my-3">
          Add Movie
        </Button>
      </Form>
    </FormContainer>
  )
}

export default MovieAddPage
