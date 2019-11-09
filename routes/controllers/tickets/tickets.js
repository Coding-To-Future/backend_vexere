const { Ticket } = require('../../../models/Ticket')
const { User } = require('../../../models/User')
const { Trip } = require('../../../models/Trip')
const { sendBookingTicketEmail } = require('../../../services/email/sendBookingTicket')
//create ticket = book ticket

module.exports.createTicket = (req, res, next) => {
    //totalprice = price *soghe
    const { tripId, seatCodes } = req.body;
    const userId = req.user.id //token

    Trip
        .findById(tripId)
        .populate("fromStation") //lay gia tri fromStation, neu ko se la id
        // console.log(populate("fromStation"))
        .populate("toStation")
        .then(trip => {
            if (!trip) return Promise.reject({ status: 404, message: "Trip not found" }) // validation
            //kiem tra voi danh sach ge con trong
            //reduce 
            const availableSeatCodes = trip.seats.filter(s => !s.isBooked).map(s => s.code)//ghe o dang false
            let errorSeatCodes = []

            seatCodes.forEach(code => {
                if (availableSeatCodes.indexOf(code) === -1) errorSeatCodes.push(code)//kiem tra ghe user nhap vao co trong availableSeatCodes hay ko, neu ko thi errorSeatCodes se luu tru ma ghe do
            })

            if (errorSeatCodes.length > 0) return Promise.reject({
                status: 400, message: "Seats are not available", notAvailableSeats: errorSeatCodes
            }) //neu errorSeatCodes co ma ghe thi thong bao ra cho nguoi dung
            // return res.status(200).json({ message: "success" })
            const newTicket = new Ticket({ //seatCodes bat buoc phai nhap dung tat ca thi moi chay
                tripId,
                userId,
                seats: seatCodes.map(s => ({//seats nhung tu seatSkeyma nen co _id
                    isBooked: true,
                    code: s
                })),
                totalPrice: trip.price * seatCodes.length
            })
            trip.seats = trip.seats.map(s => {
                if (seatCodes.indexOf(s.code) > -1) { //seatCode co trong bang trip thi sua doi thanh true
                    s.isBooked = true
                }
                return s;
            })
            return Promise.all([newTicket.save(), trip.save()]);//luu 2 tien trinh asyc xuong db
        })


        .then(result => {
            sendBookingTicketEmail(result[0], result[1], req.user); //ticket, trip, user
            res.status(200).json(result[0])
        })
        .catch(err => res.status(500).json(err))

}