import express from 'express';
import {getTrips,createTrip,getTripsFrom } from '../db/trips';

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