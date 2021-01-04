import asyncHandler from 'express-async-handler'
import Refreshment from '../models/refreshmentModel.js'
import sql_db from '../config/sql_db.js'

//@desc Fetch all refreshments
//@route GET /api/refreshments
//@access public
const getRefreshments = asyncHandler(async (req, res) => {
  const refreshments = await Refreshment.find({})

  res.json(refreshments)
})

//@desc Fetch refreshment by id
//@route GET /api/refreshments/:id
//@access public
const getRefreshmentById = asyncHandler(async (req, res) => {
  const refreshment = await Movie.findById(req.params.id)

  if (refreshment) {
    res.json(refreshment)
  } else {
    res.status(404)
    throw new Error('Refreshment not found')
  }
})

//@desc Add refreshment
//@route POST /api/refreshments
//@access public
const addRefreshment = asyncHandler(async (req, res) => {
  const { name, price, image, countInStock } = req.body
  const refreshmentExists = await Refreshment.findOne({ name: name })

  if (refreshmentExists) {
    res.status(400)
    throw new Error('Refreshment already exists')
  }

  const refreshment = await Refreshment.create({
    name: name,
    price: price,
    image: image,
    countInStock: countInStock,
  })

  if (refreshment) {
    sql_db.query(
      'INSERT INTO refreshments (name, price, countInStock) VALUES (?, ?, ?)',
      [name, price, countInStock],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )
    res.status(201).json({
      _id: refreshment._id,
      name: refreshment.name,
      image: refreshment.image,
      price: refreshment.price,
      countInStock: refreshment.countInStock,
    })
  } else {
    res.status(400)
    throw new Error('Invalid data')
  }
})

//@desc Update refreshments
//@route PUT /api/refreshments/:id
//@access public
const updateRefreshment = asyncHandler(async (req, res) => {
  const { price, countInStock } = req.body

  const refreshment = await Refreshment.findById(req.params.id)
  if (refreshment) {
    refreshment.price = price
    refreshment.countInStock = countInStock
    const updatedRefreshment = await refreshment.save()
    sql_db.query(
      'UPDATE refreshments SET price = ?, countInStock = ? WHERE name = ?',
      [
        updatedRefreshment.price,
        updatedRefreshment.countInStock,
        updatedRefreshment.name,
      ],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )
    res.json({
      name: updatedRefreshment.name,
      image: updatedRefreshment.image,
      price: updatedRefreshment.price,
      countInStock: updatedRefreshment.countInStock,
    })
  } else {
    res.status(404)
    throw new Error('Refreshment not found')
  }
})

//@desc Delete refreshments
//@route DELETE /api/refreshments/:id
//@access public
const deleteRefreshment = asyncHandler(async (req, res) => {
  const refreshment = await Refreshment.findById(req.params.id)

  if (refreshment) {
    const refName = refreshment.name
    await refreshment.remove()

    sql_db.query(
      'DELETE FROM refreshments WHERE name = ?',
      [refName],
      (err, result) => {
        if (err) {
          console.error(err)
        } else {
          console.log(result)
        }
      }
    )
    res.json({ message: 'Refresment deleted' })
  } else {
    res.status(404)
    throw new Error('Refreshment not found')
  }
})

export {
  getRefreshmentById,
  getRefreshments,
  addRefreshment,
  updateRefreshment,
  deleteRefreshment,
}
