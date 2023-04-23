import express from 'express';
import { getTickets, createTicket,findTicketById} from '../db/ticket';
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
        else if (seats.length > 1 && seats.length < 6) {
            let availableSeats:number =0;
            seats.forEach((seat:{seatNumber: string, status: string }) => {
                if (currentTrip.seats) {
                    const selectedseatnumber = parseInt(seat.seatNumber) - 1;

                    if(currentTrip.seats[selectedseatnumber].status ==='empty') {
                        availableSeats++;
                    }else{
                        availableSeats--;
                    }
                }
                else{
                    console.log("undefined");
                }
              });
              if(availableSeats == seats.length){
                const ticket =await createTicket({
                    trip,
                    seats,
                    owner: currentUser
                });
                return res.status(200).json(ticket);
            }
        }
        else if (seats.length >5){
            return res.status(400).json({ message: "Aynı anda en fazla 5 adet koltuk alabilirsiniz" });
        }
        return res.status(400).json({ message: "Seçilen bilet alınamadı. Bütün koltukların boş olduğundan emin olunuz" });
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const getTicketDetails = async (req: express.Request, res: express.Response) => {
   
    try {
        const { ticketId } = req.body;
        const ticket = await findTicketById(ticketId);
        const trip = await findTripById(ticket.trip);

        const responseData = {
            fromWhere: trip.fromWhere,
            toWhere: trip.toWhere,
            date: trip.date,
            departureTime: trip.departureTime,
            seats: ticket.seats,
          };


        return res.status(200).json(responseData);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
