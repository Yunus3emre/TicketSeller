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
interface Seat {
  seatNumber: string;
  status: 'empty' | 'reserved-by-male' | 'reserved-by-female';
}

export const TripModel = mongoose.model('Trip',TripSchema);
export const getTrips = () => TripModel.find();
export const createTrip = (values: Record<string,any>)=> new TripModel(values).save().then((trip)=>trip.toObject());
export const findTripsByLocation = (fromWhere: string, toWhere: string, date: Date) => {
  return TripModel.find({ fromWhere, toWhere, date })
    .sort({ departureTime: 1 })
    .exec()
    .then((trips) => {
      const filteredTrips = trips
        .filter((trip) =>
          trip.seats.some((seat) => seat.status === 'empty')
        )
        .map((trip) => ({
          fromWhere: trip.fromWhere,
          toWhere: trip.toWhere,
          date: trip.date,
          departureTime: trip.departureTime,
          hasEmptySeats: trip.seats.some((seat) => seat.status === 'empty'),
        }));

      return filteredTrips;
    });
};
export const findTripById = (id: string) => {
  return TripModel.findById(id)
    .exec()
    .then((trip) => {
      if (!trip) {
        throw new Error('Trip not found');
      }

      return trip.toObject();
    });
};

export const updateTripSeats = async (id: string, updatedSeats: { seatNumber: string, status: string }[]) => {
  try {
    const trip = await TripModel.findOne({_id: id}); // gelen id değerine göre trip bulunur
    if (!trip) {
      throw new Error('Trip not found'); // eğer trip bulunamazsa hata fırlatılır
    }
    
    // güncellenecek seat'lerin id'leri belirlenir
    const seatIdsToUpdate = updatedSeats.map(seat => seat.seatNumber);
    
    // belirlenen seat'lerin status değerleri güncellenir
    for (const seat of updatedSeats) {
      await TripModel.updateOne(
        {_id: id, 'seats.seatNumber': seat.seatNumber},
        {$set: {'seats.$.status': seat.status}}
      );
    }
    
    return trip;
  } catch (error) {
    throw error;
  }
};
