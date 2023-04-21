import express from "express";
import {getAllTickets,newTicket } from '../controllers/ticket';
import { isAuthenticated } from "../middlewares";

export default (router: express.Router) =>{
    router.get("/tickets", getAllTickets);
    router.post("/tickets/create", isAuthenticated,newTicket);
   
};