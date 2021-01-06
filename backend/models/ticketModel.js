import mongoose from 'mongoose'

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Show',
    },
    seatCount: {
      type: Number,
      default: 0,
    },
    ticketPrice: {
      type: Number,
      default: 0,
    },
    totalTicketPrice: {
      type: Number,
      default: 0,
    },
    refreshments: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Refreshment',
        },
        qty: {
          type: Number,
          default: 0,
        },
      },
    ],
    refreshmentCost: {
      type: Number,
      default: 0,
    },
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
  },
  {
    timestamps: true,
  }
)

const Ticket = mongoose.model('Ticket', ticketSchema)

export default Ticket
