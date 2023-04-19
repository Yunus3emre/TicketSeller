import express from "express";
import {getAllTrips,newTrip } from '../controllers/trips';

export default (router: express.Router) =>{
    router.get("/trips", getAllTrips);
    router.post("/trips/create", newTrip);
};