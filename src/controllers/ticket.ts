import express from 'express';
import { getTickets, createTicket } from '../db/ticket';
import { findTripById } from '../db/trips';
import { getUserById } from '../db/users';



export const getAllTickets = async (req: express.Request, res: express.Response) => {

    const trips = await getTickets();
    try {
        return res.status(200).json(trips);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

// export const newTicket = async (req: express.Request, res: express.Response) =>{    
//     try{
//         const currentUser= req.cookies['app-User'];
//         const { trip, seats} = req.body;

//         const currentTrip = findTripById(trip);

//         const ticket = await createTicket({
//             trip,
//             seats,
//             owner:currentUser
//         });

//         return res.status(200).json(ticket).end();

//     }catch(error){
//         console.log(error);
//         return res.sendStatus(400);
//     }
// }

export const newTicket = async (req: express.Request, res: express.Response) => {
    try {
        const currentUser = req.cookies['app-User'];
        const { trip, seats } = req.body;
        const currentTrip: any = await findTripById(trip);
        const CUser: any = await getUserById(currentUser);
        if (seats.length === 1) {
            const seatNumber = seats[0].seatNumber;
            const selectedSeat = currentTrip.seats.find((seat: { seatNumber: string }) => seat.seatNumber === seatNumber);
            if (!selectedSeat) {
                return res.status(400).json({ message: seatNumber+ ' Numaralı koltuk bulunamadı' });
            }
            const adjacentSeatNumber = parseInt(seatNumber) + (selectedSeat.seatNumber % 2 === 0 ? -1 : 1);
            const adjacentSeat = currentTrip.seats.find((seat: { seatNumber: string }) => seat.seatNumber === adjacentSeatNumber.toString());
            if (selectedSeat.status === 'empty') {
                if (adjacentSeat.status === 'reserved-by-female' && CUser.sex) {
                    return res.status(400).json({ message: "Bayan yanı olduğu için işlem yapamadınız." });
                } else if (adjacentSeat.status === 'reserved-by-male' && !CUser.sex) {
                    return res.status(400).json({ message: "Erkek yanı olduğu için işlem yapamadınız." });
                } else {
                    const ticket = await createTicket({
                        trip,
                        seats,
                        owner: currentUser
                    });
                    return res.json(ticket);
                }
            } else {
                return res.status(400).json({ message: "Bu koltuk Dolu." });
            }
        }
        return res.status(400).json({ message: "Seçilen bilet alınamadı." });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
