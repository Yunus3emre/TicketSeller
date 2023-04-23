import express from "express";
import {getAllTrips,newTrip,getTripsByLocation,getTripById } from '../controllers/trips';
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) =>{
    router.get("/trips",isAuthenticated, getAllTrips);
    router.post("/trips/create",isAuthenticated, newTrip);
    router.get("/trips/from",isAuthenticated, getTripsByLocation);
    router.get("/trips/:id",isAuthenticated, getTripById);
};