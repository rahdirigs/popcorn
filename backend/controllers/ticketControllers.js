import asyncHandler from 'express-async-handler'
import sql_db from '../config/sql_db.js'
import User from '../models/userModel.js'
import Show from '../models/showModel.js'
import Refreshment from '../models/refreshmentModel.js'
import Ticket from '../models/ticketModel.js'

//@desc Book tickets
//@route POST /api/tickets
//@access private
const bookTicket = asyncHandler(async (req, res) => {
  const {
    user,
    show,
    seatCount,
    ticketPrice,
    totalTicketPrice,
    refreshments,
    refreshmentCost,
    employee,
  } = req.body

  const ticket = await Ticket.create({
    user,
    show,
    seatCount,
    ticketPrice,
    totalTicketPrice,
    refreshments,
    refreshmentCost,
    employee,
  })

  if (ticket) {
    let earned = parseInt(totalTicketPrice) + parseInt(refreshmentCost)
    sql_db.query(
      'UPDATE movies SET earned = earned + ? WHERE id = ?',
      [earned, show.movie.refId],
      (err, result) => {
        if (err) {
          console.error(err)
        }
      }
    )

    sql_db.query(
      'UPDATE movies SET projected = (earned / (showsScreened + showsScheduled)) * 1.20 * (showsScreened + showsScheduled) WHERE id = ?',
      [show.movie.refId],
      (err, result) => {
        if (err) {
          console.error(err)
        }
      }
    )

    const userDB = await User.findOne({ email: user.email })
    userDB.watched.push({ show: show })
    await userDB.save()

    for (let i = 0; i < refreshments.length; i++) {
      const ref = await Refreshment.findOne({ name: refreshments[i].item.name })
      ref.countInStock = ref.countInStock - refreshments[i].qty
      await ref.save()

      sql_db.query(
        'UPDATE refreshments SET countInStock = countInStock - ? WHERE name = ?',
        [refreshments[i].qty, refreshments[i].item.name],
        (err, result) => {
          if (err) {
            console.error(err)
          }
        }
      )
    }

    const thisShow = await Show.findById(show._id)
    thisShow.ticketSold += parseInt(seatCount)
    thisShow.ticketLeft -= parseInt(seatCount)
    thisShow.earned += parseInt(earned)
    await thisShow.save()

    res.json(ticket)
  } else {
    res.status(200)
    throw new Error('Failed to book ticket')
  }
})

export { bookTicket }
