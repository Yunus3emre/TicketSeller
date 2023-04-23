import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    owner:{type: String, required: true},
    trip:{type: String, required:true},
    seats: [
        {
            seatNumber: {type: String, required: true},
            status: {type: String, enum: ['reserved-by-male', 'reserved-by-female'], required: true}
        }
    ]
});

export const TicketModel = mongoose.model('Ticket',TicketSchema);

export const getTickets = () => TicketModel.find();
export const createTicket = (values: Record<string,any>)=> new TicketModel(values).save().then((ticket)=>ticket.toObject());
export const getUserTickets = async (ownerId:string) => {
    try {
      const tickets = await TicketModel.find({ owner: ownerId }).exec();
      return tickets;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
