import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    owner:{type: String, required: true},
    fromWhere:{type:String,required : true},
    toWhere:{type:String,required : true},
    date:{type:Date,required : true},
    departureTime:{type:String,required : true},
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