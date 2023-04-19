import mongoose from "mongoose";

const TripSchema = new mongoose.Schema({
    fromWhere:{type:String,required : true},
    toWhere:{type:String,required : true},
    date:{type:Date,required : true},
    departureTime:{type:String,required : true},
    price:{type:Number,required : true},
    seats: [
        {
            seatNumber: {type: String, required: true},
            status: {type: String, enum: ['empty', 'reserved-by-male', 'reserved-by-female'], required: true}
        }
    ]
});

export const TripModel = mongoose.model('Trip',TripSchema);
export const getTrips = () => TripModel.find();
export const getTripsFrom = () => TripModel.find({fromWhere:'fromWhere'});
export const createTrip = (values: Record<string,any>)=> new TripModel(values).save().then((trip)=>trip.toObject());