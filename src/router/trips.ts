import express from "express";
import {getAllTrips,newTrip,getTripsByLocation,getTripById } from '../controllers/trips';

export default (router: express.Router) =>{
    router.get("/trips", getAllTrips);
    router.post("/trips/create", newTrip);
    router.get("/trips/from", getTripsByLocation);
    router.get("/trips/:id", getTripById);
};