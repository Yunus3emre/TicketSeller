import express from "express";
import {getAllTickets,newTicket } from '../controllers/ticket';
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) =>{
    router.get("/tickets",isAuthenticated,isOwner, getAllTickets);
    router.post("/tickets/create",isAuthenticated, isAuthenticated,newTicket);
   
};