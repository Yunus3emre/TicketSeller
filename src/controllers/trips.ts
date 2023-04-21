import express from 'express';
import {getTrips,createTrip,findTripsByLocation,findTripById } from '../db/trips';

export const getAllTrips = async (req:express.Request, res:express.Response)=>{
    try {
        const trips = await getTrips();

        return res.status(200).json(trips);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }                 
}
export const newTrip = async (req: express.Request, res: express.Response) =>{
    try{
        const { fromWhere, toWhere, date, departureTime, price, seats} = req.body;

        const trip = await createTrip({
           fromWhere,
           toWhere,
           date,
           departureTime,
           price,
           seats
        });

        return res.status(200).json(trip).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}


export const getTripsByLocation = async (req: express.Request, res: express.Response) => {
    const { fromWhere, toWhere, date } = req.body;

    try {

      const trips = await findTripsByLocation(fromWhere, toWhere,date);
      if (trips.length===0) {
        return res.status(400).json({ message: "Seçilen bölgelerde sefer bilgisi bulunamadı." });
      }
      res.status(200).json({ trips });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const getTripById = async (req: express.Request, res: express.Response) => {
    const Id  =  req.params.id;
    try {
      const trip = await findTripById(Id);
      res.status(200).json({ trip });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };