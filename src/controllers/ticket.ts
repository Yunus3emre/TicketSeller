import express from 'express';
import {getTickets,createTicket } from '../db/ticket';
import {findTripById} from '../db/trips';



export const getAllTickets = async (req:express.Request, res:express.Response)=>{
    
    const trips = await getTickets();
    try {
        return res.status(200).json(trips);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }                 
}

export const newTicket = async (req: express.Request, res: express.Response) =>{    
    try{
        const currentUser= req.cookies['app-User'];
        
        const { fromWhere, toWhere, date, departureTime, seats} = req.body;



        const ticket = await createTicket({
           fromWhere,
           toWhere,
           date,
           departureTime,           
           seats,
           owner:currentUser
           
        });

        return res.status(200).json(ticket).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}
