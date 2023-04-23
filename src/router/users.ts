import express from "express";

import {getAllUsers,deleteUser,updateUser,getUserTicket} from "../controllers/users"
import { isAuthenticated,isOwner } from "../middlewares";
import {getTicketDetails} from "../controllers/ticket";

export default (router: express.Router) =>{
    router.get("/users", getAllUsers);
    
    router.delete("/users/:id",isAuthenticated,isOwner, deleteUser);
    router.patch("/users/:id",isAuthenticated,isOwner, updateUser);
    router.get("/users/ticket", getUserTicket);
    router.get("/users/ticket-details", getTicketDetails);
};